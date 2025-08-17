import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      userType: string
    }

    if (decoded.userType !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("userType")
    const status = searchParams.get("status")

    let query = db.sql`
      SELECT u.*, 
             rp.specialty, rp.location as rp_location, rp.profile_status as rp_status,
             ep.organization_name, ep.organization_type, ep.profile_status as ep_status
      FROM users u
      LEFT JOIN replacement_profiles rp ON u.id = rp.user_id
      LEFT JOIN employer_profiles ep ON u.id = ep.user_id
      WHERE u.user_type != 'admin'
    `

    if (userType) {
      query = db.sql`${query} AND u.user_type = ${userType}`
    }

    if (status) {
      query = db.sql`${query} AND (rp.profile_status = ${status} OR ep.profile_status = ${status})`
    }

    query = db.sql`${query} ORDER BY u.created_at DESC`

    const users = await query

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
