import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Euro, Briefcase } from "lucide-react";

// Helper function to format dates to YYYY-MM-DD
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

export default function AvailableMissionsSection() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/missions");
        if (!res.ok) throw new Error("Erreur lors du chargement des missions");
        const data = await res.json();
        setMissions(data.missions || []);
      } catch (err) {
        setError("Erreur lors du chargement des missions");
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  return (
   <Card className="mb-8 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-3xl overflow-hidden border border-gray-200">
    <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-8">
      <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight">Missions disponibles</CardTitle>
      <CardDescription className="text-indigo-100 text-base md:text-lg mt-2 opacity-90">
        Explorez les opportunités pour votre prochaine mission professionnelle
      </CardDescription>
    </CardHeader>
    <CardContent className="p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-300 flex items-center gap-2 transition-all duration-300">
          <span className="font-semibold text-sm">Erreur :</span> 
          <span className="text-sm">{error}</span>
        </div>
      )}
      {loading ? (
        <div className="text-center text-gray-600 py-12 animate-pulse text-lg font-medium">
          Chargement des missions...
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {missions.length === 0 ? (
            <div className="col-span-full text-gray-500 text-center py-12 text-lg font-medium">
              Aucune mission disponible pour le moment.
            </div>
          ) : (
            missions.map((mission) => (
              <div
                key={mission.id}
                className="relative border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-gray-50 group"
                role="article"
                aria-labelledby={`mission-title-${mission.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative flex flex-col space-y-4">
                  <h3
                    id={`mission-title-${mission.id}`}
                    className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight"
                  >
                    {mission.title || mission.organization_name || "Mission"}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span className="line-clamp-1">{mission.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="line-clamp-1">{mission.specialty_required || "Non spécifié"}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {mission.description || "Aucune description disponible."}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-900 font-semibold px-3 py-1.5 rounded-full"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {formatDate(mission.start_date)} - {formatDate(mission.end_date)}
                    </Badge>
                    {(mission.daily_rate || mission.hourly_rate) && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-900 font-semibold px-3 py-1.5 rounded-full"
                      >
                        <Euro className="w-3.5 h-3.5 mr-1.5" />
                        {mission.daily_rate ? `${mission.daily_rate}€/jour` : `${mission.hourly_rate}€/h`}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="secondary"
                      className="w-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-colors duration-200"
                      onClick={() => { setSelectedMission(mission); setContactOpen(true); }}
                    >
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </CardContent>
    <Dialog open={contactOpen} onOpenChange={setContactOpen}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Contact de l'établissement</DialogTitle>
          <DialogDescription className="text-gray-600 text-base">
            Coordonnées et adresse complète du cabinet ou de la clinique.
          </DialogDescription>
        </DialogHeader>
        {selectedMission ? (
          <div className="space-y-4 mt-6">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">Nom :</span>
              <span className="text-gray-900">{selectedMission.organization_name || selectedMission.title || "-"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">Téléphone :</span>
              <span className="text-gray-900">{selectedMission.contact_phone || "Non renseigné"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">Email :</span>
              <span className="text-gray-900">{selectedMission.contact_email || "Non renseigné"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">Adresse complète :</span>
              <span className="text-gray-900">{selectedMission.full_address || selectedMission.location || "Non renseignée"}</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-6">Aucune mission sélectionnée.</div>
        )}
        <DialogClose asChild>
          <Button variant="outline" className="mt-6 w-full border-gray-300 text-gray-900 hover:bg-gray-100 rounded-xl py-2.5 font-semibold transition-colors duration-200">
            Fermer
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  </Card>
  );
}
