
export const dynamic = "force-dynamic";
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import jwt, { Secret } from "jsonwebtoken"

function createToken(payload: object, secret: jwt.Secret, expiresIn = "7d") {
  // @ts-ignore
  return jwt.sign(payload, secret, { expiresIn })
}

const JWT_SECRET = process.env.JWT_SECRET || "medical-replacement-platform-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      userType,
      firstName,
      lastName,
      phone,
      profession,
      location,
      companyName,
      companyType,
    } = body

    // Validate required fields
    if (!email || !password || !userType || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    // Create user
    const user = await db.createUser({
      email,
      password_hash: password, // Store plain text password
      user_type: userType,
      first_name: firstName,
      last_name: lastName,
      phone,
    })

    // Create profile based on user type
    if (userType === "replacement"  ) {
      await db.createReplacementProfile({
        user_id: user.id,
        profession: profession || "",
        location: location || ""
      })
    } else if (userType === "employer" && companyName && companyType) {
      await db.createEmployerProfile({
        user_id: user.id,
        organization_name: companyName,
        organization_type: companyType.toLowerCase().replace(/\s+/g, "_"),
        address: location || "",
        city: location?.split(",")[0] || "",
      })
    }

    const token = createToken(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
    )

    // Create response
    const response = NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          userType: user.user_type,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      },
      { status: 201 },
    )

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
