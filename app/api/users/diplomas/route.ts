import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/database" 
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// 🔐 Extract user from JWT
function getUserFromJWT(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      userType?: string
    }
    return decoded
  } catch {
    return null
  }
}

// ✅ GET diplomas
export async function GET(req: NextRequest) {
  const user = getUserFromJWT(req) 
  if (!user) {
    console.error("[Diplomas API][GET] Unauthorized: No user in JWT");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const diplomas = await db.getDiplomasByUser(user.userId)
    return NextResponse.json({ diplomas })
  } catch (err) {
    console.error("[Diplomas API][GET] Diploma fetch error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// ✅ POST diploma
export async function POST(req: NextRequest) {
  const user = getUserFromJWT(req)

  if (!user) {
    console.error("[Diplomas API][POST] Unauthorized: No user in JWT");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("[Diplomas API][POST] Invalid JSON body:", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, institution, year, description } = body;

  if (!title || !institution) {
    console.error("[Diplomas API][POST] Missing title or institution", { title, institution });
    return NextResponse.json(
      { error: "Title and institution are required" },
      { status: 400 }
    )
  }

  try {
    const diploma = await db.createDiploma({
      user_id: user.userId,
      title: title,
      institution: institution,
      year: year,
      description: description,
    })
    return NextResponse.json({ diploma })
  } catch (err) {
    console.error("[Diplomas API][POST] Diploma creation error:", err, { userId: user.userId, title, institution, year, description });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
