import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Users, Star, MapPin, Euro, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import DoctorProfileModal from "./DoctorProfileModal";

interface Doctor {
  id: string;
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
}

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const specialties = ["Cardiologie", "Médecine générale", "Pédiatrie"];
  const locations = ["Lyon", "Villeurbanne"];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Erreur lors du chargement des médecins");
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch {
        setError("Erreur lors du chargement des médecins");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      search.trim() === "" ||
      (`${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(search.toLowerCase()));
    const matchesSpecialty =
      specialty === "" || specialty === "all" || doctor.specialty?.toLowerCase() === specialty.toLowerCase();
    const matchesLocation =
      location === "" || location === "all" || doctor.location?.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Doctor Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DoctorProfileModal open={profileOpen} onOpenChange={setProfileOpen} doctorId={selectedDoctorId} />
      </Dialog>


      {/* Filters */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Rechercher par nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 py-4 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Specialty */}
          <div className="w-full md:w-48">
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="py-4 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-600">
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec.toLowerCase()}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="w-full md:w-48">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="py-4 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-600">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc.toLowerCase()}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <main className="max-w-6xl mx-auto flex-1 px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-semibold text-lg">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-gray-600 text-lg py-12 font-medium">Chargement des médecins...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-gray-600 text-center text-lg font-medium py-12">Aucun médecin disponible.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 bg-white overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <Avatar className="w-20 h-20 rounded-full ring-4 ring-blue-100">
                      <AvatarImage src={doctor.photo_url || "/uploads/logo.png"} />
                      <AvatarFallback className="text-xl font-semibold bg-gray-100">
                        {doctor.first_name?.[0]}
                        {doctor.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        Dr. {doctor.first_name} {doctor.last_name}
                      </h3>
                      <Badge className="mt-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-purple-700 border-0">
                        {doctor.specialty}
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 text-gray-600 text-base mb-5">
                    {doctor.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span>{doctor.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{doctor.location}</span>
                    </div>
                    {doctor.completed_missions && (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span>{doctor.completed_missions} missions</span>
                      </div>
                    )}
                    {doctor.daily_rate && (
                      <div className="flex items-center gap-2">
                        <Euro className="w-5 h-5 text-gray-400" />
                        <span>{doctor.daily_rate}€/jour</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500">{doctor.availability}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl"
                      onClick={() => {
                        setSelectedDoctorId(doctor.id);
                        setProfileOpen(true);
                      }}
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Profil
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300">
                      Contacter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
