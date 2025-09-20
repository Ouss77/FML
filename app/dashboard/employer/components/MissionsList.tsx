// Helper to format ISO date to dd/mm/yyyy
function formatDateDMY(dateString: string | undefined) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('fr-FR');
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Users, Calendar, MapPin, Euro, Plus, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import EditMissionModal from "./EditMissionModal";
import AddMissionModal from "./AddMissionModal";

export default function MissionsList({ 
  missions, setMissions, employerId, loading, setLoading, error, setError, setShowCreateMission
}: {
  missions: any[];
  setMissions: React.Dispatch<React.SetStateAction<any[]>>;
  employerId: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setShowCreateMission: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [editMission, setEditMission] = useState<any | null>(null);

  // Edit mission handler (opens modal)
  function handleEditMission(mission: any) {
    setEditMission(mission);
    setShowCreateMission(false);
  }

  // Delete mission handler
  async function handleDeleteMission(id: string) {
    if (!window.confirm("Supprimer cette mission ?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/missions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression de la mission");
      setMissions((prev) => prev.filter((mission) => mission.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la mission");
    } finally {
      setLoading(false);
    }
  }

 return (
<Card className="relative shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 transform transition-all duration-300 hover:scale-[1.03]">
  {/* Decorative Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
  </div>

  <CardContent className="p-8 relative z-10">
    <Button
      onClick={() => setShowCreateMission(true)}
      className="bg-white text-blue-700 hover:bg-blue-100 font-semibold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
    >
      <Plus className="w-5 h-5" />
      Nouvelle mission
    </Button>

    {/* Data States */}
    {loading ? (
      <div className="py-12 text-center text-gray-500 font-medium">Chargement des missions...</div>
    ) : error ? (
      <div className="py-12 text-center text-red-500 font-medium">{error}</div>
    ) : missions.length === 0 ? (
      <div className="py-12 text-center text-gray-400 font-medium">
        Aucune mission trouvée. Créez-en une pour commencer !
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {missions.map((mission) => (
          <Card
            key={mission.id}
            className="hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-2xl bg-white/70 backdrop-blur-md min-w-0 w-full max-w-xs mx-auto overflow-hidden"
          >
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                {/* Mission Header */}
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{mission.title}</h3>
                  <Badge className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 text-white text-xs font-semibold">
                    {mission.specialty_required || mission.specialty}
                  </Badge>
                </div>

                {/* Mission Details */}
                <div className="grid grid-cols-1 text-xs text-gray-600 gap-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {mission.location}
                  </span>
                  {/* <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {formatDateDMY(mission.start_date || mission.startDate)} - {formatDateDMY(mission.end_date || mission.endDate)}
                  </span> */}
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-pink-500" />
                    {mission.applicants ?? 0} candidature(s)
                  </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-4">{mission.description}</p>

                {mission.selectedDoctor && (
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Assigné à {mission.selectedDoctor}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-1">
                  Publié le {formatDateDMY(mission.created_at)}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 justify-end mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMission(mission)}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full px-3 py-1 shadow-sm transition-all duration-200 text-xs flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteMission(mission.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50 rounded-full px-3 py-1 shadow-sm transition-all duration-200 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}

    {/* Edit Modal */}
    <EditMissionModal
      editMission={editMission}
      employerId={employerId || ''}
      setEditMission={setEditMission}
      setMissions={setMissions}
      setLoading={setLoading}
      setError={setError}
    />
  </CardContent>
</Card>

)}
 