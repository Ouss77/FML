
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building2, User2, Upload } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileTabs() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        setProfileData({
          userId: data.user?.id || "",
          userType: data.user?.user_type || "employer", // fallback for employer dashboard
          photo_url: data.profile?.photo_url || "",
          establishmentName: data.profile?.organization_name || "",
          establishmentType: data.profile?.organization_type || "",
          address: data.profile?.address || "",
          siret: data.profile?.siret_number || "",
          description: data.profile?.description || "",
          firstName: data.user?.firstName || "",
          lastName: data.user?.lastName || "",
          email: data.user?.email || "", 
          phone: data.user?.phone || "",
          fonction: data.profile?.fonction || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Save handler for unified form
  const handleSave = async () => {
    try {
      let photo_url = form.photo_url;
      // 1. Upload image if selected 
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", profileData.userId);
        formData.append("userType", profileData.userType);
        const res = await fetch("/api/profile/upload-photo", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Erreur lors de l'upload de la photo");
        const data = await res.json();
        photo_url = data.photo_url;
      }
      // 2. Save all profile data
      const payload = {
        establishment_name: form.establishmentName,
        establishment_type: form.establishmentType,
        address: form.address, 
        siret: form.siret,
        description: form.description,
        firstName: form.firstName,
        lastName: form.lastName,
        fonction: form.fonction,
        email: form.email,
        phone: form.phone,
        profileData: { photoUrl: photo_url },
      };
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
      setProfileData({ ...form, photo_url });
      setEditOpen(false);
      setSelectedFile(null);
      setPreviewUrl(undefined);
      alert("Modifications sauvegardées avec succès !");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  if (loading) return <div className="py-12 text-center text-gray-500">Chargement du profil...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!profileData) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-32 relative">
        {/* Avatar */}
        <div className="absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
          {profileData.photo_url ? (
            <img src={profileData.photo_url} alt="Photo de profil" className="object-cover w-full h-full" />
          ) : (
            <User2 className="w-16 h-16 text-blue-300" />
          )}
        </div>
      </div>
      {/* Main Info */}
      <div className="pt-16 pb-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">{profileData.firstName} {profileData.lastName}</h2>
        <div className="text-blue-600 text-md font-medium mb-1">{profileData.fonction || "-"}</div>
        <div className="text-blue-500 text-sm mb-2">{profileData.establishmentType === "hospital"
          ? "Hôpital public"
          : profileData.establishmentType === "clinic"
          ? "Clinique privée"
          : profileData.establishmentType === "cabinet"
          ? "Cabinet médical"
          : <span className="text-gray-400">-</span>}</div>
        <Button
          size="sm"
          className="mt-2 bg-white border border-blue-500 text-blue-700 px-4 py-1 rounded-full shadow hover:bg-blue-50"
          onClick={() => {
            setForm({ ...profileData });
            setEditOpen(true);
          }}
        >
          Modifier le profil
        </Button>
      </div>
      {/* About Section */}
      <div className="px-8 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">À PROPOS</h3>
        <p className="text-gray-600 text-sm mb-4">{profileData.description || "Aucune description renseignée."}</p>
        <hr className="my-4" />
        {/* Contact Info */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">INFORMATIONS DE CONTACT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 01-8 0" /><circle cx="12" cy="7" r="4" /><path d="M12 14v7" /></svg>
            <a href={`mailto:${profileData.email}`} className="text-blue-700 underline">{profileData.email || "-"}</a>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13 1.13.37 2.25.72 3.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.58 6.58l1.27-1.27a2 2 0 012.11-.45c1.09.35 2.21.59 3.34.72A2 2 0 0121 16.91z" /></svg>
            <span className="font-semibold text-green-700">Téléphone:</span> <span>{profileData.phone || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 01-1.9 5.4c-1.5 2-4.1 4.1-7.1 4.1s-5.6-2.1-7.1-4.1A8.38 8.38 0 013 10.5C3 6.36 7.03 3 12 3s9 3.36 9 7.5z" /></svg>
            <span>{profileData.phone || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243" /><path d="M7 10V7a5 5 0 0110 0v3" /><path d="M12 19v2" /></svg>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(profileData.address)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{profileData.address || "-"}</a>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-700"><span className="font-semibold">SIRET:</span> {profileData.siret || "-"}</div>
      </div>
      {/* Edit Dialog (unchanged) */}
      {editOpen && (
        // ...existing code...
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setEditOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4 text-blue-900">Modifier le profil établissement</h3>
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full border-2 border-blue-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewUrl || form?.photo_url ? (
                  <img src={previewUrl || form.photo_url} alt="Profil établissement" className="object-cover w-full h-full" />
                ) : (
                  <Building2 className="w-12 h-12 text-blue-300" />
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" /> Changer la photo
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nom de l'établissement</Label>
                <Input className="mt-1" value={form.establishmentName || ""} onChange={e => setForm((f: any) => ({ ...f, establishmentName: e.target.value }))} />
              </div>
              <div>
                <Label>Type d'établissement</Label>
                <select className="mt-1 w-full border rounded h-10" value={form.establishmentType || ""} onChange={e => setForm((f: any) => ({ ...f, establishmentType: e.target.value }))}>
                  <option value="">--</option>
                  <option value="hospital">Hôpital public</option>
                  <option value="clinic">Clinique privée</option>
                  <option value="cabinet">Cabinet médical</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label>Adresse</Label>
                <Input className="mt-1" value={form.address || ""} onChange={e => setForm((f: any) => ({ ...f, address: e.target.value }))} />
              </div>
              <div>
                <Label>SIRET</Label>
                <Input className="mt-1" value={form.siret || ""} onChange={e => setForm((f: any) => ({ ...f, siret: e.target.value }))} />
              </div>

              <div>
                <Label>Prénom</Label>
                <Input className="mt-1" value={form.firstName || ""} onChange={e => setForm((f: any) => ({ ...f, firstName: e.target.value }))} />
              </div>
              <div>
                <Label>Nom</Label>
                <Input className="mt-1" value={form.lastName || ""} onChange={e => setForm((f: any) => ({ ...f, lastName: e.target.value }))} />
              </div>
              <div>
                <Label>Fonction</Label>
                <Input className="mt-1" value={form.fonction || ""} onChange={e => setForm((f: any) => ({ ...f, fonction: e.target.value }))} />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-1" value={form.email || ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input className="mt-1" value={form.phone || ""} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))} />
              </div>
                              <div className="md:col-span-2">
                <Label>Description</Label>
                <Input className="mt-1" value={form.description || ""} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} />
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow" onClick={handleSave}>
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
