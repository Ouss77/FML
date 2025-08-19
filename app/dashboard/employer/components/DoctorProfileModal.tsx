import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Euro } from "lucide-react";
import React from "react";

interface Experience {
  title: string;
  company: string;
  start: string;
  end?: string;
  description?: string;
}

interface Education {
  school: string;
  degree: string;
  year: string;
}

interface DoctorProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    first_name: string;
    last_name: string;
    photo_url?: string;
    specialty?: string;
    location?: string;
    rating?: number;
    completed_missions?: number;
    daily_rate?: number;
    availability?: string;
    last_active?: string;
    about?: string;
    experiences?: Experience[];
    education?: Education[];
    email?: string;
    phone?: string;
  } | null;
}

export default function DoctorProfileModal({ open, onOpenChange, doctor }: DoctorProfileModalProps) {
  if (!doctor) return null;
  return (
    <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-3xl shadow-2xl border-2 border-blue-200">
      <div className="flex flex-col md:flex-row">
        {/* Left: Avatar and basic info */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 flex flex-col items-center justify-center p-10 md:w-1/3 text-white relative">
          <Avatar className="w-32 h-32 mb-4 ring-4 ring-white shadow-xl">
            <AvatarImage src={doctor.photo_url || "/placeholder.svg?height=128&width=128"} />
            <AvatarFallback className="text-3xl font-bold bg-blue-200 text-blue-700">
              {doctor.first_name?.[0]}{doctor.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-2xl mb-1 drop-shadow">Dr. {doctor.first_name} {doctor.last_name}</h3>
          <Badge variant="outline" className="text-base font-semibold border-white text-white bg-blue-500/30 mb-2 px-4 py-1">
            {doctor.specialty}
          </Badge>
          {doctor.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="text-base font-semibold">{doctor.rating}</span>
            </div>
          )}
          <div className="flex flex-col gap-1 text-white text-base mt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-200" />
              {doctor.location}
            </div>
            {doctor.email && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Email:</span> {doctor.email}
              </div>
            )}
            {doctor.phone && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Téléphone:</span> {doctor.phone}
              </div>
            )}
          </div>
          <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <DialogClose asChild>
              <Button variant="secondary" className="rounded-full px-8 py-2 bg-white text-blue-700 font-bold shadow hover:bg-blue-100">Fermer</Button>
            </DialogClose>
          </div>
        </div>
        {/* Right: Details */}
        <div className="flex-1 p-10 bg-white overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2 text-blue-700">Profil professionnel</DialogTitle>
            <DialogDescription className="mb-4 text-base text-gray-600">
              {doctor.about || <span className="italic text-gray-400">A propos non renseigné.</span>}
            </DialogDescription>
          </DialogHeader>
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 text-base text-blue-700 mb-2">
              {doctor.completed_missions && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  {doctor.completed_missions} missions accomplies
                </div>
              )}
              {doctor.daily_rate && (
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-blue-400" />
                  {doctor.daily_rate}€/jour
                </div>
              )}
            </div>
            <div className="text-base text-gray-700 mb-2">
              <span className="font-semibold">Disponibilités :</span> {doctor.availability || <span className="italic text-gray-400">Non renseigné</span>}
            </div>
            <div className="text-sm text-gray-400">Dernière activité : {doctor.last_active}</div>
          </div>
          {/* Experiences */}
          {doctor.experiences && doctor.experiences.length > 0 && (
            <div className="mb-8">
              <h4 className="font-bold text-lg mb-3 text-blue-700">Expériences professionnelles</h4>
              <ul className="space-y-4">
                {doctor.experiences.map((exp, idx) => (
                  <li key={idx} className="border-l-4 border-blue-400 pl-4 bg-blue-50/50 rounded-lg py-2">
                    <div className="font-semibold text-blue-800">{exp.title} <span className="text-gray-600">- {exp.company}</span></div>
                    <div className="text-sm text-gray-500">{exp.start} - {exp.end || "Aujourd'hui"}</div>
                    {exp.description && <div className="text-base text-gray-700 mt-1">{exp.description}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Education */}
          {doctor.education && doctor.education.length > 0 && (
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-3 text-blue-700">Formation</h4>
              <ul className="space-y-4">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="border-l-4 border-green-400 pl-4 bg-green-50/50 rounded-lg py-2">
                    <div className="font-semibold text-green-800">{edu.degree} <span className="text-gray-600">- {edu.school}</span></div>
                    <div className="text-sm text-gray-500">{edu.year}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
