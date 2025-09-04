import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User } from "lucide-react";

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
  hourlyRate: string;
  dailyRate: string;
  availability: string;
}

interface ProfileSectionProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
}

export default function ProfileSection({
  profileData, setProfileData, isEditProfileOpen, setIsEditProfileOpen,
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(profileData.photoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Cleanup temporary preview URLs
  useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    console.log('[PROFILE] Selected file:', file);
    console.log('[PROFILE] Preview URL:', tempUrl); 
  };

  const handleSaveProfile = async () => {
    setUploading(true);
    setUploadError("");
    let photoUrl = profileData.photoUrl;
    // 1. Upload image if selected
  console.log('[PROFILE] userId before upload:', profileData.userId, typeof profileData.userId);
if (selectedFile && profileData.userId) {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", profileData.userId);

    const res = await fetch("/api/profile/upload-photo", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Erreur lors de l'upload");
    const data = await res.json();

    photoUrl = data.photo_url;

    setProfileData((prev) => ({ ...prev, photoUrl: data.photo_url }));
    setPreviewUrl(undefined); // reset temporary preview
    setSelectedFile(null);
  } catch (err) {
    setUploadError("Erreur lors de l'upload de la photo");
    setUploading(false);
    return;
  }
}

    // 2. Save profile data
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          profileData: {
            specialty: profileData.specialty,
            location: profileData.location,
            photoUrl,
          },
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde du profil");
      setIsEditProfileOpen(false);
    } catch (err) {
      setUploadError("Erreur lors de la sauvegarde du profil");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Log on mount and when profileData changes
    console.log('[PROFILE] profileData:', profileData);
    console.log("the image profile", profileData.imageProfile)
  }, [profileData]);

  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-white min-h-[480px] flex flex-col justify-center">
    <CardHeader className="flex flex-col items-center gap-4 pb-0">
  <div className="relative h-24 w-24 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">

      <img src={ profileData.imageProfile} alt="ouss" className="object-cover w-full h-full" />
      {/* <User className="w-12 h-12 text-blue-500" /> */}
   
  </div>

  <div className="text-center">
    <CardTitle className="text-3xl font-bold text-blue-900 mb-1">Profil Médecin</CardTitle>
    <CardDescription className="text-blue-700 text-lg">Informations personnelles</CardDescription>
  </div>

  <Button variant="outline" size="lg" className="mt-2" onClick={() => setIsEditProfileOpen(true)}>
    Modifier
  </Button>
</CardHeader>
      <CardContent className="pt-0 flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-4 text-lg">
          <div>
            <Label className="text-base text-blue-800">Nom Complet</Label>
            <div className="font-semibold text-2xl text-gray-900 mb-2 break-words">{profileData.firstName} {profileData.lastName}</div>
          </div>

          <div>
            <Label className="text-base text-blue-800">Email</Label>
            <div className="text-gray-700 mb-2 break-words">{profileData.email}</div>
          </div>
          <div>
            <Label className="text-base text-blue-800">Téléphone</Label>
            <div className="text-gray-700 mb-2 break-words">{profileData.phone}</div>
          </div>
          <div>
            <Label className="text-base text-blue-800">Spécialité</Label>
            <div className="text-gray-700 mb-2 break-words">{profileData.specialty}</div>
          </div>
          <div>
            <Label className="text-base text-blue-800">Localisation</Label>
            <div className="text-gray-700 mb-2 break-words">{profileData.location}</div>
          </div>
        </div>

        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-blue-900 text-2xl font-bold mb-2">Modifier le profil</DialogTitle>
              <CardDescription className="text-blue-700 mb-4">Mettez à jour vos informations personnelles</CardDescription>
            </DialogHeader>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col items-center mb-4">
                <div className="relative h-24 w-24 rounded-full bg-blue-100 mb-2 overflow-hidden flex items-center justify-center">
                  {previewUrl || profileData.photoUrl ? (
                    <img
                      src={previewUrl || profileData.photoUrl}
                      alt="Profil"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-500" />
                  )}
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-white border border-blue-200 rounded-full p-1 shadow hover:bg-blue-50"
                    onClick={() => fileInputRef.current?.click()}
                    title="Changer la photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z"
                      />
                    </svg>
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                </div>

                {uploading && <div className="text-xs text-blue-600 mt-1">Upload en cours...</div>}
                {uploadError && <div className="text-xs text-red-600 mt-1">{uploadError}</div>}
              </div>

              {/* Existing form inputs */}
              <div>
                <Label className="text-xs text-blue-800">Prénom</Label>
                <Input
                  className="mt-1"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Nom</Label>
                <Input
                  className="mt-1"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Email</Label>
                <Input
                  className="mt-1"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Téléphone</Label>
                <Input
                  className="mt-1"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-blue-800">Spécialité</Label>
                <Input
                  className="mt-1"
                  value={profileData.specialty}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, specialty: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-blue-800">Localisation</Label>
                <Input
                  className="mt-1"
                  value={profileData.location}
                  onChange={(e) => setProfileData((prev: any) => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </form>

            <DialogFooter className="mt-6 flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center">
              <Button
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
                onClick={handleSaveProfile}
                disabled={uploading}
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
