import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  previewUrl?: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsEditProfileOpen: (open: boolean) => void;
}

export default function EditProfileDialog({
  open, onOpenChange,profileData, setProfileData,
  fileInputRef, previewUrl, setPreviewUrl, selectedFile,
  setSelectedFile, setIsEditProfileOpen,
}: EditProfileDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
  };

  const handleSaveProfile = async () => {
    setUploading(true);
    setUploadError("");
    let photoUrl = profileData.photoUrl;
    // 1. Upload image if selected
    if (selectedFile && profileData.userId) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", profileData.userId);

        const res = await fetch("/api/profile/upload-photo", {
          method: "POST", body: formData,
        });

        if (!res.ok) throw new Error("Erreur lors de l'upload");
        const data = await res.json();

        photoUrl = data.photo_url;

        setProfileData((prev: any) => ({ ...prev, photoUrl: data.photo_url }));
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
            experience_years: profileData.experience_years,
            languages: profileData.languages,
            bio: profileData.bio,
            is_available: profileData.is_available,
            availability_start: profileData.availability_start,
            availability_end: profileData.availability_end,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 max-w-4xl min-h-0">
        <DialogHeader>
          <DialogTitle className="text-blue-900 text-2xl font-bold mb-2">Modifier le profil</DialogTitle>
          <CardDescription className="text-blue-700 mb-4">Mettez à jour vos informations personnelles</CardDescription>
        </DialogHeader>
  <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="md:col-span-2 flex flex-col items-center mb-0">
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
          {/* Existing form inputs + new fields */}
          <div>
            <Label className="text-base text-blue-800">Prénom</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.firstName}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-base text-blue-800">Nom</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.lastName}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-base text-blue-800">Email</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.email}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-base text-blue-800">Téléphone</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.phone}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="">
            <Label className="text-base text-blue-800">Spécialité</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.specialty}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, specialty: e.target.value }))}
            />
          </div>
          <div className="">
            <Label className="text-base text-blue-800">Localisation</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.location}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-base text-blue-800">Années d'expérience</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              type="number"
              min="0"
              value={profileData.experience_years ?? ''}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, experience_years: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-base text-blue-800">Langues parlées</Label>
            <Input
              className="mt-2 h-12 text-lg px-4"
              value={Array.isArray(profileData.languages) ? profileData.languages.join(', ') : (profileData.languages || '')}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, languages: e.target.value.split(',').map((l: string) => l.trim()) }))}
            />
          </div>
                    <div className="md:col-span-2 flex flex-row gap-2 items-end">
                      <div className="flex-1">
                        <Label className="text-base text-blue-800">Disponible</Label>
                        <select
                          className="mt-1 h-11 text-lg px-4 w-full border rounded"
                          value={profileData.is_available === true ? 'true' : profileData.is_available === false ? 'false' : ''}
                          onChange={(e) => setProfileData((prev: any) => ({ ...prev, is_available: e.target.value === 'true' }))}
                        >
                          <option value="">--</option>
                          <option value="true">Oui</option>
                          <option value="false">Non</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <Label className="text-base text-blue-800">Début disponibilité</Label>
                        <Input
                          className="mt-1 h-11 text-lg px-4"
                          type="date"
                          value={profileData.availability_start || ''}
                          onChange={(e) => setProfileData((prev: any) => ({ ...prev, availability_start: e.target.value }))}
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-base text-blue-800">Fin disponibilité</Label>
                        <Input
                          className="mt-1 h-11 text-lg px-4"
                          type="date"
                          value={profileData.availability_end || ''}
                          onChange={(e) => setProfileData((prev: any) => ({ ...prev, availability_end: e.target.value }))}
                        />
                      </div>
                    </div>
          <div className="md:col-span-2">
            <Label className="text-base text-blue-800">Bio</Label>
            <Input
              className="mt-1 h-11 text-lg px-4"
              value={profileData.bio || ''}
              onChange={(e) => setProfileData((prev: any) => ({ ...prev, bio: e.target.value }))}
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
  );
}
