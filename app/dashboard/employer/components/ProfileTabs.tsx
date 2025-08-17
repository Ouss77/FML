import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Building2, User2, BarChart2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProfileTabs() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        setProfileData({
          establishmentName: data.profile?.establishment_name || "",
          establishmentType: data.profile?.establishment_type || "",
          address: data.profile?.address || "",
          siret: data.profile?.siret || "",
          description: data.profile?.description || "",
          firstName: data.user?.firstName || "",
          lastName: data.user?.lastName || "",
          position: data.profile?.position || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
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
        payload.position = profileData.position;
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
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-blue-900">Nom de l'établissement</Label>
            <Input
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.establishmentName}
              onChange={(e) => setProfileData({ ...profileData, establishmentName: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-blue-900">Type d'établissement</Label>
            <Select
              value={profileData.establishmentType}
              onValueChange={(value) => setProfileData({ ...profileData, establishmentType: value })}
            >
              <SelectTrigger className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/80 bg-white/90 rounded-lg shadow-sm transition">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital">Hôpital public</SelectItem>
                <SelectItem value="clinic">Clinique privée</SelectItem>
                <SelectItem value="cabinet">Cabinet médical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-blue-900">Adresse</Label>
            <Textarea
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-blue-900">SIRET</Label>
            <Input
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.siret}
              onChange={(e) => setProfileData({ ...profileData, siret: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-blue-900">Description</Label>
            <Textarea
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.description}
              onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
              rows={4}
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
            onClick={() => handleSave("establishment")}
          >
            Sauvegarder
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
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-green-900">Prénom</Label>
              <Input
                className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100/80 bg-white/90 rounded-lg shadow-sm transition"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-green-900">Nom</Label>
              <Input
                className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100/80 bg-white/90 rounded-lg shadow-sm transition"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-green-900">Fonction</Label>
            <Input
              className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.position}
              onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-green-900">Email</Label>
            <Input
              className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-green-900">Téléphone</Label>
            <Input
              className="border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100/80 bg-white/90 rounded-lg shadow-sm transition"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
            onClick={() => handleSave("contact")}
          >
            Sauvegarder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
