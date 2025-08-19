import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Users, Star, MapPin, Euro } from "lucide-react";
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
  // Optionally add more fields for profile
  about?: string;
  experiences?: { title: string; company: string; start: string; end?: string; description?: string }[];
  education?: { school: string; degree: string; year: string }[];
  email?: string;
  phone?: string;
}

export default function DoctorsList() {
  // ...existing code...

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Erreur lors du chargement des médecins");
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (err) {
        setError("Erreur lors du chargement des médecins");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors based on search, specialty, and location
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      search.trim() === "" || 
      (`${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(search.toLowerCase()));
    const matchesSpecialty =
      specialty === "" || specialty === "all" || (doctor.specialty && doctor.specialty.toLowerCase() === specialty.toLowerCase());
    const matchesLocation =
      location === "" || location === "all" || (doctor.location && doctor.location.toLowerCase().includes(location.toLowerCase()));
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const specialties = ["Cardiologie", "Médecine générale", "Pédiatrie"];
  const locations = ["Lyon", "Villeurbanne"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      {/* Doctor Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DoctorProfileModal open={profileOpen} onOpenChange={setProfileOpen} doctor={selectedDoctor} />
      </Dialog>
      {/* Main doctor list UI */}
      <Card className="flex-1 h-full shadow-2xl rounded-3xl border border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="pb-4">
          <div className="text-center">
            <p className="text-lg text-gray-600">Trouvez le médecin idéal pour vos remplacements</p>
          </div>
          {/* Search Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-lg font-bold text-gray-800 mb-2 block">
                Rechercher 
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Rechercher par nom..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm w-full"
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="specialty" className="text-lg font-bold text-gray-800 mb-2 block">
                Spécialité
              </Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-600 rounded-xl py-4 text-lg w-full">
                  <SelectValue placeholder="Spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-lg">Toutes</SelectItem>
                  {specialties.map((spec) => (
                    <SelectItem key={spec} value={spec.toLowerCase()} className="text-lg">
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="location" className="text-lg font-bold text-gray-800 mb-2 block">
                Localisation
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-600 rounded-xl py-4 text-lg w-full">
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-lg">Toutes</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc.toLowerCase()} className="text-lg">
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8 flex-1 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-semibold text-lg">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center text-gray-600 text-lg py-12 font-medium">
              Chargement des médecins...
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDoctors.length === 0 ? (
                <div className="text-gray-600 text-center text-lg font-medium py-12">
                  Aucun médecin disponible.
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 bg-white"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-5">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={doctor.photo_url || "/placeholder.svg?height=80&width=80"} />
                            <AvatarFallback className="text-xl font-semibold bg-gray-100">
                              {doctor.first_name?.[0]}{doctor.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-bold text-xl text-gray-900">
                                Dr. {doctor.first_name} {doctor.last_name}
                              </h3>
                              <Badge variant="outline" className="text-base font-semibold border-purple-200 text-purple-700 bg-purple-50">
                                {doctor.specialty}
                              </Badge>
                              {doctor.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                  <span className="text-base text-gray-600">{doctor.rating}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-base text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                {doctor.location}
                              </div>
                              {doctor.completed_missions && (
                                <div className="flex items-center gap-2">
                                  <Users className="w-5 h-5 text-gray-400" />
                                  {doctor.completed_missions} missions
                                </div>
                              )}
                              {doctor.daily_rate && (
                                <div className="flex items-center gap-2">
                                  <Euro className="w-5 h-5 text-gray-400" />
                                  {doctor.daily_rate}€/jour
                                </div>
                              )}
                            </div>
                            <p className="text-base text-gray-700 mb-3">{doctor.availability}</p>
                            <p className="text-sm text-gray-500">{doctor.last_active}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 ml-6">
                          <Button
                            variant="outline"
                            size="lg"
                            className="text-base font-semibold border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl"
                            onClick={() => { setSelectedDoctor(doctor); setProfileOpen(true); }}
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            Profil
                          </Button>
                          <Button
                            size="lg"
                            className="text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl hover:scale-105 transition-all duration-300"
                          >
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}