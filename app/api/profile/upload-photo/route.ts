import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { writeFile } from "fs/promises";
import path from "path";

// POST /api/profile/upload-photo
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); 
    const userId = formData.get("userId");
    console.log("[UPLOAD-API] Received file:", file);
    console.log("[UPLOAD-API] Received userId:", userId);
    if (!file || typeof userId !== "string" || !(file instanceof File)) {
      console.error("[UPLOAD-API] Invalid file or userId", { file, userId });
      return NextResponse.json({ error: "Invalid file or userId" }, { status: 400 });
    }
    // Save file to /public/uploads
    const ext = path.extname(file.name) || ".jpg";
    const fileName = `${userId}_${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    console.log("[UPLOAD-API] Saving file to:", filePath);
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));
    // Update DB
    const photoUrl = `/uploads/${fileName}`;
    try {
      const dbResult = await db.updateProfilePhoto(userId, photoUrl);
      console.log("[UPLOAD-API] DB update result:", dbResult);
    } catch (dbErr) {
      console.error("[UPLOAD-API] Error updating DB:", dbErr);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
    return NextResponse.json({ photo_url: photoUrl });
  } catch (error) {
    console.error("[UPLOAD-API] Error uploading photo:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
