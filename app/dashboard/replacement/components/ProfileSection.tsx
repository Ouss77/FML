import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Briefcase, Globe, Heart, Pencil, Calendar, FileText } from "lucide-react"
import EditProfileDialog from "./EditProfileDialog";

interface ProfileData {
  imageProfile: string | undefined;
  userId: string;
  photoUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string; 
  location: string;
  experience_years?: number;
  languages?: string[];
  bio?: string;
  is_available?: boolean;
  availability_start?: string;
  availability_end?: string;
  profile_status?: string;
}

interface ProfileSectionProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
}

// Helper to fetch profile data from API
async function fetchProfileData(): Promise<ProfileData | null> {
  try {
    const res = await fetch("/api/users/profile");
    if (!res.ok) return null;
    const { user, profile } = await res.json();
    return {
      userId: user?.id || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      imageProfile: profile?.photo_url || "",
      specialty: profile?.specialty || "",
      location: profile?.location || "",
      experience_years: profile?.experience_years ?? "",
      languages: profile?.languages || [],
      bio: profile?.bio || "",
      is_available: profile?.is_available ?? false,
      availability_start: profile?.availability_start || "",
      availability_end: profile?.availability_end || "",
      profile_status: profile?.profile_status || undefined,
    };
  } catch {
    return null;
  }
}

export default function ProfileSection({
  profileData, setProfileData, isEditProfileOpen, setIsEditProfileOpen,
}: ProfileSectionProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(profileData.photoUrl);

  // Fetch profile data on mount
  useEffect(() => {
    (async () => {
      const data = await fetchProfileData();
      console.log("the data", data)
      if (data) setProfileData(data);
    })();
  }, []);

  // Cleanup temporary preview URLs
  useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  return (
  <Card className="relative max-w-3xl mx-auto shadow-xl border-0 bg-white rounded-3xl overflow-hidden scale-[0.9] mt-0">
      {/* Top gradient */}
  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-32"></div>

      {/* Profile Image */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-md">
          <img
            src={profileData.imageProfile}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

  <CardContent className="pt-10 pb-6 flex flex-col items-center text-center text-[0.92rem]">
        {/* Title */}
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-lg font-bold text-blue-900">Profil Médecin</h2>
          {profileData.profile_status === "approved" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Profil vérifié
            </span>
          )}
        </div>
  <p className="text-base font-medium text-gray-800">
          {profileData.firstName} {profileData.lastName}
        </p>
  <p className="text-blue-600 text-sm">{profileData.specialty || "-"}</p>

        {/* Buttons */}
  <div className="flex gap-2 mt-2">
          <Button
            className="bg-blue-600 text-white px-5 rounded-xl shadow"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Pencil className="w-4 h-4 mr-1" /> Modifier
          </Button>
          <Button variant="outline" className="px-5 rounded-xl shadow">
            Télécharger CV
          </Button>
        </div>

        {/* Info grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-4 text-xs">
          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>{profileData.email}</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>{profileData.phone}</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>{profileData.location}</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <span>{profileData.experience_years ?? "-"} ans</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Globe className="w-5 h-5 text-blue-500" />
            <span>
              {Array.isArray(profileData.languages)
                ? profileData.languages.join(", ")
                : profileData.languages || "-"}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Heart className="w-5 h-5 text-blue-500" />
            <span>{profileData.specialty}</span> 
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl col-span-2">
            <Label className="text-gray-600">Disponibilité :</Label>
            <span
              className={`ml-2 font-medium ${
                profileData.is_available ? "text-green-600" : "text-red-600"
              }`}
            >
              {profileData.is_available ? "Disponible" : "Non disponible"}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>
              {profileData.availability_start
                ? new Date(profileData.availability_start).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-xl">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>
              {profileData.availability_end
                ? new Date(profileData.availability_end).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div className="flex items-start gap-1 bg-gray-50 p-2 rounded-xl col-span-2">
            <FileText className="w-5 h-5 text-blue-500 mt-1" />
            <span>{profileData.bio || "-"}</span>
          </div>
        </div>

        {/* Edit dialog */}
        <EditProfileDialog
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          profileData={profileData}
          setProfileData={setProfileData}
          fileInputRef={fileInputRef}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setIsEditProfileOpen={setIsEditProfileOpen}
        />
      </CardContent>
    </Card>
  );
}
