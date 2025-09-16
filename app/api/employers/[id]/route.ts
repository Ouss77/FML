import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const employer = await db.getEmployerProfile(params.id);
    if (!employer) {
      return NextResponse.json({ error: "Employer not found" }, { status: 404 });
    }
    return NextResponse.json({ employer });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
