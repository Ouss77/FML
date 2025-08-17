import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sql, db } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "medical-replacement-platform-secret-key-2024"

// Get user profile
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

    const user = await db.getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let profile = null
    if (user.user_type === "replacement") {
      profile = await db.getReplacementProfile(user.id)
    } else if (user.user_type === "employer") {
      const rawProfile = await db.getEmployerProfile(user.id)
      if (rawProfile) {
        profile = {
          establishment_name: rawProfile.organization_name,
          establishment_type: rawProfile.organization_type,
          siret: rawProfile.siret_number,
          address: rawProfile.address,
          position: rawProfile.contact_person,
          description: rawProfile.description,
          // add other fields as needed
        }
      }
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        userType: user.user_type,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
      },
      profile,
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update user profile
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    let decoded: { userId: string; userType: string }
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string; userType: string }
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
    const { firstName, lastName, phone, profileData } = body

    if (!firstName && !lastName && !phone && !profileData) {
      return NextResponse.json({ error: "No profile data provided" }, { status: 400 })
    }

    // Update basic user info
    if (firstName || lastName || phone) {
      try {
        await sql`
          UPDATE users 
          SET first_name = ${firstName || null}, 
              last_name = ${lastName || null}, 
              phone = ${phone || null},
              updated_at = NOW()
          WHERE id = ${decoded.userId}
        `
      } catch (err) {
        console.error("User update error:", err)
        return NextResponse.json({ error: "Failed to update user info" }, { status: 500 })
      }
    }

    // Update profile-specific data
    if (profileData && decoded.userType === "replacement") {
      try {
        await sql`
          UPDATE replacement_profiles 
          SET specialty = ${profileData.specialty || null},
              location = ${profileData.location || null},
              experience_years = ${profileData.experienceYears || null},
              diploma = ${profileData.diploma || null},
              languages = ${profileData.languages || []},
              bio = ${profileData.bio || null},
              availability_start = ${profileData.availabilityStart || null},
              availability_end = ${profileData.availabilityEnd || null},
              updated_at = NOW()
          WHERE user_id = ${decoded.userId}
        `
      } catch (err) {
        console.error("Replacement profile update error:", err)
        return NextResponse.json({ error: "Failed to update replacement profile" }, { status: 500 })
      }
    } else if (profileData && decoded.userType === "employer") {
      try {
        await sql`
          UPDATE employer_profiles 
          SET organization_name = ${profileData.organizationName || null},
              organization_type = ${profileData.organizationType || null},
              siret_number = ${profileData.siretNumber || null},
              address = ${profileData.address || null},
              city = ${profileData.city || null},
              postal_code = ${profileData.postalCode || null},
              contact_person = ${profileData.contactPerson || null},
              description = ${profileData.description || null},
              website = ${profileData.website || null},
              updated_at = NOW()
          WHERE user_id = ${decoded.userId}
        `
      } catch (err) {
        console.error("Employer profile update error:", err)
        return NextResponse.json({ error: "Failed to update employer profile" }, { status: 500 })
      }
    }

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
