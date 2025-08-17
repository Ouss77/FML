
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Users, Star, MapPin, Euro } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

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
      specialty === "" || (doctor.specialty && doctor.specialty.toLowerCase() === specialty.toLowerCase());
    const matchesLocation =
      location === "" || (doctor.location && doctor.location.toLowerCase().includes(location.toLowerCase()));
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Médecins disponibles</CardTitle>
            <CardDescription>Trouvez le médecin idéal pour vos remplacements</CardDescription>
          </div>
        </div>
        {/* Filtres de recherche */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <input
              className="border rounded px-2 py-1 w-full"
              placeholder="Rechercher par nom..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border rounded px-2 py-1 w-48"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
          >
            <option value="">Spécialité</option>
            <option value="cardiologie">Cardiologie</option>
            <option value="medecine générale">Médecine générale</option>
            <option value="pédiatrie">Pédiatrie</option>
          </select>
          <select
            className="border rounded px-2 py-1 w-48"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">Localisation</option>
            <option value="lyon">Lyon</option>
            <option value="villeurbanne">Villeurbanne</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500 py-8">Chargement des médecins...</div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <div className="text-gray-500 text-center">Aucun médecin disponible.</div>
            ) : (
              filteredDoctors.map((doctor: any) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={doctor.photo_url || "/placeholder.svg?height=64&width=64"} />
                          <AvatarFallback>
                            {doctor.first_name?.[0]}{doctor.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">Dr. {doctor.first_name} {doctor.last_name}</h3>
                            <Badge variant="outline">{doctor.specialty}</Badge>
                            {doctor.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600">{doctor.rating}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {doctor.location}
                            </div>
                            {doctor.completed_missions && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {doctor.completed_missions} missions
                              </div>
                            )}
                            {doctor.daily_rate && (
                              <div className="flex items-center gap-1">
                                <Euro className="w-4 h-4" />
                                {doctor.daily_rate}€/jour
                              </div>
                            )} 
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{doctor.availability}</p>
                          <p className="text-xs text-gray-500">{doctor.last_active}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Profil
                        </Button>
                        <Button size="sm">Contacter</Button>
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
  );
}
