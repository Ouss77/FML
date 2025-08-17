export const dynamic = "force-dynamic";
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import jwt from "jsonwebtoken"



const JWT_SECRET = process.env.JWT_SECRET || "medical-replacement-platform-secret-key-2024"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, userType } = body

    // Validate required fields
    if (!email || !password || !userType) {
      return NextResponse.json({ error: "Email, password, and user type are required" }, { status: 400 })
    }

    // Find user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user type matches
    if (user.user_type !== userType) {
      return NextResponse.json({ error: "Invalid user type for this account" }, { status: 401 })
    }

    if (password !== user.password_hash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token using jsonwebtoken
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          userType: user.user_type,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      },
      { status: 200 },
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
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
