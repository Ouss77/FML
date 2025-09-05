import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import EditEstablishmentDialog from "./EditEstablishmentDialog";
import EditContactDialog from "./EditContactDialog";
import { Building2, User2, BarChart2 } from "lucide-react";
import React, { useEffect, useState } from "react";


export default function ProfileTabs() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editEstablishment, setEditEstablishment] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [establishmentForm, setEstablishmentForm] = useState<any>(null);
  const [contactForm, setContactForm] = useState<any>(null);

  useEffect(() => { 
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        console.log("Profil utilisateur:", data);
        setProfileData({
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
          experience_years: data.profile?.experience_years || "",
          languages: data.profile?.languages || "",
          bio: data.profile?.bio || "",
          is_available: data.profile?.is_available || "",
          availability_start: data.profile?.availability_start || "",
          availability_end: data.profile?.availability_end || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Generic function to save a section
  const handleSave = async (section: string) => {
    try {
      const payload: any = {};
      if (section === "establishment") {
        payload.establishment_name = profileData.establishmentName;
        payload.establishment_type = profileData.establishmentType;
        payload.address = profileData.address;
        payload.siret = profileData.siret;
        payload.description = profileData.description;
      } else if (section === "contact") {
        payload.firstName = profileData.firstName;
        payload.lastName = profileData.lastName;
        payload.fonction = profileData.fonction;
        payload.email = profileData.email;
        payload.phone = profileData.phone;
      }

      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
      alert("Modifications sauvegardées avec succès !");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  if (loading) return <div className="py-12 text-center text-gray-500">Chargement du profil...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!profileData) return null;

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Establishment Info */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-blue-50 to-blue-100/80 rounded-3xl">  
        <CardHeader className="flex flex-col gap-2 pb-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-700 shadow-md">
              <Building2 className="w-5 h-5" />
            </span>
            <CardTitle className="text-blue-900 text-lg font-bold">Informations établissement</CardTitle>
          </div>
          <CardDescription className="text-blue-700 font-medium text-sm">
            Gérez les informations de votre établissement
          </CardDescription>
        </CardHeader>
      <CardContent className="space-y-2 p-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-900 w-48">Nom de l'établissement:</span>
          <span className="text-base text-blue-950 font-medium">{profileData.establishmentName || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-900 w-48">Type d'établissement:</span>
          <span className="text-base text-blue-950 font-medium">{
            profileData.establishmentType === "hospital"
              ? "Hôpital public"
              : profileData.establishmentType === "clinic"
              ? "Clinique privée"
              : profileData.establishmentType === "cabinet"
              ? "Cabinet médical"
              : <span className="text-gray-400">-</span>
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-900 w-48">Adresse:</span>
          <span className="text-base text-blue-950 font-medium">{profileData.address || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-900 w-48">SIRET:</span>
          <span className="text-base text-blue-950 font-medium">{profileData.siret || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-900 w-48">Description:</span>
          <span className="text-base text-blue-950 font-medium">{profileData.description || <span className="text-gray-400">-</span>}</span>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all mt-2 float-right"
          onClick={() => {
            setEstablishmentForm({ ...profileData });
            setEditEstablishment(true);
          }}
        >
          Modifier
        </Button>
      </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-green-50 to-green-100/80 rounded-3xl">
        <CardHeader className="flex flex-col gap-2 pb-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-700 shadow-md">
              <User2 className="w-5 h-5" />
            </span>
            <CardTitle className="text-green-900 text-lg font-bold">Contact et responsable</CardTitle>
          </div>
          <CardDescription className="text-green-700 font-medium text-sm">
            Informations de contact principal
          </CardDescription>
        </CardHeader>
      <CardContent className="space-y-2 p-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Prénom:</span>
          <span className="text-base text-green-950 font-medium">{profileData.firstName || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Nom:</span>
          <span className="text-base text-green-950 font-medium">{profileData.lastName || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Fonction:</span>
          <span className="text-base text-green-950 font-medium">{profileData.fonction || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Email:</span>
          <span className="text-base text-green-950 font-medium">{profileData.email || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Téléphone:</span>
          <span className="text-base text-green-950 font-medium">{profileData.phone || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Années d'expérience:</span>
          <span className="text-base text-green-950 font-medium">{profileData.experience_years ?? <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Langues parlées:</span>
          <span className="text-base text-green-950 font-medium">{Array.isArray(profileData.languages) ? profileData.languages.join(', ') : (profileData.languages || <span className="text-gray-400">-</span>)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Bio:</span>
          <span className="text-base text-green-950 font-medium">{profileData.bio || <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Disponible:</span>
          <span className="text-base text-green-950 font-medium">{profileData.is_available === true ? 'Oui' : profileData.is_available === false ? 'Non' : <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Début disponibilité:</span>
          <span className="text-base text-green-950 font-medium">{profileData.availability_start ? new Date(profileData.availability_start).toLocaleDateString() : <span className="text-gray-400">-</span>}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-900 w-48">Fin disponibilité:</span>
          <span className="text-base text-green-950 font-medium">{profileData.availability_end ? new Date(profileData.availability_end).toLocaleDateString() : <span className="text-gray-400">-</span>}</span>
        </div>
        <Button
          className="float-right bg-gradient-to-r from-green-400 to-green-500 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all mt-2"
          onClick={() => {
            setContactForm({ ...profileData });
            setEditContact(true);
          }}
        >
          Modifier
        </Button>
      </CardContent>
      </Card>
    </div>

    <EditEstablishmentDialog
      open={editEstablishment}
      onOpenChange={setEditEstablishment}
      form={establishmentForm}
      setForm={setEstablishmentForm}
      onSave={() => {
        setProfileData(establishmentForm);
        handleSave("establishment");
        setEditEstablishment(false);
      }}
    />
    <EditContactDialog
      open={editContact}
      onOpenChange={setEditContact}
      form={contactForm}
      setForm={setContactForm}
      onSave={() => {
        setProfileData({ ...profileData, ...contactForm });
        handleSave("contact");
        setEditContact(false);
      }}
    />
    </>
  );
}
