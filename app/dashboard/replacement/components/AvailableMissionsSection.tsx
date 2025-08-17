import { useEffect, useState } from "react";
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
    <Card className="mb-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <CardTitle className="text-2xl md:text-3xl font-bold">Missions disponibles</CardTitle>
        <CardDescription className="text-blue-100 text-sm md:text-base">
          Découvrez les opportunités ouvertes pour votre prochaine mission
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
            <span className="font-semibold">Erreur :</span> {error}
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-500 py-10 animate-pulse">
            Chargement des missions...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missions.length === 0 ? (
              <div className="col-span-full text-gray-500 text-center py-10">
                Aucune mission disponible pour le moment.
              </div>
            ) : (
              missions.map((mission) => (
                <div
                  key={mission.id}
                  className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  role="article"
                  aria-labelledby={`mission-title-${mission.id}`}
                >
                  <div className="flex flex-col space-y-3">
                    <h3
                      id={`mission-title-${mission.id}`}
                      className="font-semibold text-lg text-gray-900 line-clamp-2"
                    >
                      {mission.title || mission.organization_name || "Mission"}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                      {mission.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
                      {mission.specialty_required || "Non spécifié"}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-3">
                      {mission.description || "Aucune description disponible."}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 font-medium px-3 py-1"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(mission.start_date)} - {formatDate(mission.end_date)}
                      </Badge>
                      {(mission.daily_rate || mission.hourly_rate) && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 font-medium px-3 py-1"
                        >
                          <Euro className="w-3 h-3 mr-1" />
                          {mission.daily_rate ? `${mission.daily_rate}€/jour` : `${mission.hourly_rate}€/h`}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}