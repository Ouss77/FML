import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sql } from "@/lib/database";   // 👈 import sql here


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
// Delete mission (employer only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("DELETE /api/missions called with params:", params);

    const token = request.cookies.get("auth-token")?.value;
    console.log("Token received:", token);

    if (!token) {
      console.error("No auth token found in cookies");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        userType: string;
      };
      console.log("Decoded JWT:", decoded);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (decoded.userType !== "employer") {
      console.error("User not employer:", decoded.userType);
      return NextResponse.json(
        { error: "Only employers can delete missions" },
        { status: 403 }
      );
    }

    console.log("Deleting mission with ID:", params.id, "for employer:", decoded.userId);

const result = await sql`
  DELETE FROM missions 
  WHERE id = ${params.id} AND employer_id = ${decoded.userId}
  RETURNING id
`;

if (result.length === 0) {
  return NextResponse.json(
    { error: "Mission not found or you don’t have permission" },
    { status: 404 }
  );
}


    return NextResponse.json({ message: "Mission deleted successfully" });
  } catch (error) {
    console.error("Mission deletion error (uncaught):", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mission = await sql`
      SELECT m.*, ep.organization_name, u.first_name, u.last_name, u.email, u.phone
      FROM missions m
      JOIN users u ON m.employer_id = u.id
      LEFT JOIN employer_profiles ep ON u.id = ep.user_id
      WHERE m.id = ${params.id}
    `;

    if (mission.length === 0) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    }

    return NextResponse.json({ mission: mission[0] });
  } catch (error) {
    console.error("Mission fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



// Update mission (employer only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      userType: string
    }

    if (decoded.userType !== "employer") {
      return NextResponse.json({ error: "Only employers can update missions" }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      specialtyRequired,
      location,
      startDate,
      endDate,
      hourlyRate,
      dailyRate,
      requirements,
      missionType,
      isUrgent,
      status,
    } = body

    await sql`
      UPDATE missions 
      SET title = ${title},
          description = ${description},
          specialty_required = ${specialtyRequired},
          location = ${location},
          start_date = ${startDate},
          end_date = ${endDate},
          hourly_rate = ${hourlyRate ? Number.parseFloat(hourlyRate) : null},
          daily_rate = ${dailyRate ? Number.parseFloat(dailyRate) : null},
          requirements = ${requirements || null},
          mission_type = ${missionType || "replacement"},
          is_urgent = ${isUrgent || false},
          status = ${status || "open"},
          updated_at = NOW()
      WHERE id = ${params.id} AND employer_id = ${decoded.userId}
    `

    return NextResponse.json({ message: "Mission updated successfully" })
  } catch (error) {
    console.error("Mission update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 