import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    // Get experiences
    const experiences = await db.getExperiences(userId);
    // Get diplomas
    const diplomas = await db.getDiplomasByUser(userId);

    // Get documents (CV, CIN, diplome)
    const documents = await db.getDocumentsByUser(userId);
    // Group by type for easy access
    const docMap: Record<string, any[]> = {};
    for (const doc of documents) {
      if (!docMap[doc.document_type]) docMap[doc.document_type] = [];
      docMap[doc.document_type].push(doc);
    }

    return NextResponse.json({
      experiences,
      diplomas,
      documents: docMap,
    });
  } catch (error) {
    console.error("Profile details fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
