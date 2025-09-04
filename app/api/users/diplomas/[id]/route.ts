import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/database";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extract user from JWT (copied from diplomas/route.ts)
function getUserFromJWT(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      userType?: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromJWT(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const diplomaId = params.id;
  try {
    // Only allow user to delete their own diploma
    const deleted = await db.deleteDiploma({ id: diplomaId, user_id: user.userId });
    if (!deleted) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Diplomas API][DELETE] Diploma deletion error:", error, { userId: user.userId, diplomaId });
    return NextResponse.json({ error: "Erreur lors de la suppression du diplôme" }, { status: 500 });
  }
}
