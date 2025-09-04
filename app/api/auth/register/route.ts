export const dynamic = "force-dynamic";
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

// Simple JWT implementation to avoid library issues
function createToken(payload: any, secret: string, expiresIn = "7d") {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const exp = now + 7 * 24 * 60 * 60 // 7 days in seconds

  const tokenPayload = { ...payload, iat: now, exp }

  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(tokenPayload))

  const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`)
  

  return `${encodedHeader}.${encodedPayload}.${signature}`
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
      // Replacement doctor fields
      specialty,
      location,
      availability,
      // Employer fields
      companyName,
      companyType,
      siret,
      description,
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
    if (userType === "replacement" && specialty && location) {
      await db.createReplacementProfile({
        user_id: user.id,
        specialty,
        location,
        bio: availability,
      })
    } else if (userType === "employer" && companyName && companyType) {
      await db.createEmployerProfile({
        user_id: user.id,
        organization_name: companyName,
        organization_type: companyType.toLowerCase().replace(/\s+/g, "_"),
        siret_number: siret,
        address: location || "",
        city: location?.split(",")[0] || "",
        postal_code: "00000", // Default, should be extracted from location
        description,
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
