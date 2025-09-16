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
        <div className="flex flex-row gap-8 p-8 items-start">
          {/* Doctor image, left side */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-xl bg-gray-200 overflow-hidden border border-gray-100 flex items-center justify-center">
              <img
                src={doctor.profile?.photo_url || "logo.png"}
                alt="doctor"
                className="w-full h-full object-cover rounded-xl"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          {/* Info and tabs, right side */}
          <div className="flex-1 flex flex-col justify-start">
            <DialogHeader className="space-y-2 mb-2">
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
            <div className="mt-2">
              <Tabs defaultValue="profil">
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
                  {doctor.profile?.experience_years !== undefined && (
                    <p className="flex items-center gap-2">Années d'expérience : <span className="font-semibold">{doctor.profile.experience_years}</span></p>
                  )}
                  {doctor.profile?.languages && Array.isArray(doctor.profile.languages) && doctor.profile.languages.length > 0 && (
                    <p className="flex items-center gap-2">Langues : <span className="font-semibold">{doctor.profile.languages.join(', ')}</span></p>
                  )}
                  {(doctor.profile?.availability_start || doctor.profile?.availability_end) && (
                    <p className="flex items-center gap-2">
                      Disponibilité :
                      <span className="font-semibold">
                        {doctor.profile.availability_start ? `du ${new Date(doctor.profile.availability_start).toLocaleDateString('fr-FR')}` : ''}
                        {doctor.profile.availability_start && doctor.profile.availability_end ? ' ' : ''}
                        {doctor.profile.availability_end ? `au ${new Date(doctor.profile.availability_end).toLocaleDateString('fr-FR')}` : ''}
                      </span>
                    </p>
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
            </div>
          </div>
        </div>
      ) : null}
    </DialogContent>
  );
}
 