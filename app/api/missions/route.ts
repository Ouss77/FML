import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db, sql } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get missions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")
    const status = searchParams.get("status") || "open"
    const employerId = searchParams.get("employerId")
    const isUrgent = searchParams.get("isUrgent")

    // Check user type from auth-token if present
    const token = request.cookies.get("auth-token")?.value
    let userType = null, userId = null
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, userType: string }
        userType = decoded.userType
        userId = decoded.userId
      } catch {}
    }

    const filters: any = { status }
    if (specialty) filters.specialty = specialty
    if (location) filters.location = location
    if (isUrgent === "true") filters.is_urgent = true

    // If employer, always filter by their id (ignore employerId param from client)
    if (userType === "employer") {
      filters.employer_id = userId
    } else if (employerId) {
      // For admin or other, allow explicit employerId param
      filters.employer_id = employerId
    }

    const missions = await db.getMissions(filters)

    return NextResponse.json({ missions })
  } catch (error) {
    console.error("Missions fetch error:", error) 
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create new mission (employers only)
export async function POST(request: NextRequest) {
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
      return NextResponse.json({ error: "Only employers can create missions" }, { status: 403 })
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
    } = body

    if (!title || !description || !specialtyRequired || !location || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const mission = await db.createMission({
      employer_id: decoded.userId,
      title,
      description,
      specialty_required: specialtyRequired,
      location,
      start_date: startDate,
      end_date: endDate,
      hourly_rate: hourlyRate ? Number.parseFloat(hourlyRate) : undefined,
      daily_rate: dailyRate ? Number.parseFloat(dailyRate) : undefined,
      requirements,
      mission_type: missionType || "replacement",
      is_urgent: isUrgent || false,
    })

    // Notify relevant replacement doctors
    const relevantDoctors = await sql`
      SELECT u.id FROM users u
      JOIN replacement_profiles rp ON u.id = rp.user_id
      WHERE rp.specialty = ${specialtyRequired} 
      AND rp.location ILIKE ${"%" + location + "%"}
      AND rp.is_available = true
      AND rp.profile_status = 'approved'
    `

    for (const doctor of relevantDoctors) {
      await sql`
        INSERT INTO notifications (user_id, title, message, notification_type, related_id)
        VALUES (${doctor.id}, 'Nouvelle mission disponible', 
                ${`Une nouvelle mission en ${specialtyRequired} est disponible à ${location}.`}, 
                'new_mission', ${mission.id})
      `
    }

    return NextResponse.json({ mission }, { status: 201 })
  } catch (error) {
    console.error("Mission creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
 