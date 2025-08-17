import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get user documents
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

    const { searchParams } = new URL(request.url)
    const documentType = searchParams.get("documentType")

    let query = db.sql`
      SELECT d.*, u.first_name, u.last_name, u.email,
             v.first_name as verified_by_first_name, v.last_name as verified_by_last_name
      FROM documents d
      JOIN users u ON d.user_id = u.id
      LEFT JOIN users v ON d.verified_by = v.id
      WHERE d.user_id = ${decoded.userId}
    `

    if (documentType) {
      query = db.sql`${query} AND d.document_type = ${documentType}`
    }

    query = db.sql`${query} ORDER BY d.uploaded_at DESC`

    const documents = await query

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Documents fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
