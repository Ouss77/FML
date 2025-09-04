import { 
  DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DoctorProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorId: string | null;
}

export default function DoctorProfileModal({ open, onOpenChange, doctorId }: DoctorProfileModalProps) {
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !doctorId) return;
    setLoading(true); 
    setError("");
    fetch(`/api/doctors/${doctorId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement du profil médecin");
        return res.json();
      })
      .then((data) => setDoctor(data))
      .catch(() => setError("Erreur lors du chargement du profil médecin"))
      .finally(() => setLoading(false));
  }, [open, doctorId]);

  if (!open) return null;

  return (
    <DialogContent className="max-w-3xl w-full rounded-2xl shadow-xl p-0 overflow-hidden">
      {loading ? (
        <div className="py-12 text-center text-lg text-gray-500">Chargement du profil...</div>
      ) : error ? (
        <div className="py-12 text-center text-lg text-red-500">{error}</div>
      ) : doctor ? (
        <div className="flex flex-col">
          {/* Image rectangle plus grande */}
          <div className="flex"></div>
          <div className="w-full h-60 bg-gray-200 overflow-hidden">
            <img 
              src={doctor.profile?.photo_url || "logo.png"} 
              alt="doctor" 
              className="w-full h-full object-cover"
            />
          </div>
                      <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Dr. {(doctor.profile?.first_name || doctor.first_name) ?? ""} {(doctor.profile?.last_name || doctor.last_name) ?? ""}
              </DialogTitle>
              <DialogDescription className="text-gray-600 flex items-center gap-2">
                {doctor.profile?.specialty || doctor.specialty || "Spécialité non renseignée"} • 
                {doctor.profile?.location || doctor.location || ""}
                <Badge className={`ml-2 ${doctor.profile?.is_available ? "bg-green-500" : "bg-gray-400"}`}>
                  {doctor.profile?.is_available ? "Disponible" : "Indisponible"}
                </Badge>
              </DialogDescription>
            </DialogHeader>

          {/* Infos */}
          <div className="p-6">


            {/* Tabs */}
            <Tabs defaultValue="profil" className="mt-6">
              <TabsList className="border-b w-full justify-start">
                <TabsTrigger value="profil">Profil</TabsTrigger>
                <TabsTrigger value="experience">Expérience</TabsTrigger>
                <TabsTrigger value="diplomes">Diplômes</TabsTrigger>
              </TabsList>

              {/* Profil */}
              <TabsContent value="profil" className="mt-4 space-y-3 text-gray-700">
                {doctor.profile?.location && (
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {doctor.profile.location}</p>
                )}
                {doctor.profile?.email && (
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> {doctor.profile.email}</p>
                )}
                {doctor.profile?.phone && (
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> {doctor.profile.phone}</p>
                )}
              </TabsContent>

              {/* Expérience */}
              <TabsContent value="experience" className="mt-4">
                {doctor.experiences?.length > 0 ? (
                  doctor.experiences.map((exp: any, idx: number) => (
                    <div key={idx} className="p-3 border-b">
                      <p className="font-semibold">{exp.workplace_name}</p>
                      <p className="text-sm text-gray-500">{exp.specialty} • {exp.location}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucune expérience renseignée.</p>
                )}
              </TabsContent>

              {/* Diplômes */}
              <TabsContent value="diplomes" className="mt-4">
                {doctor.diplomas?.length > 0 ? (
                  doctor.diplomas.map((dip: any, idx: number) => (
                    <div key={idx} className="p-3 border-b">
                      <p className="font-semibold">{dip.title}</p>
                      <p className="text-sm text-gray-500">{dip.institution} • {dip.year}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucun diplôme renseigné.</p>
                )}
              </TabsContent>
            </Tabs>

            {/* Boutons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" asChild>
                <DialogClose>Contacter</DialogClose>
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </DialogContent>
  );
}
