'use client'; // Important! Forces client-side rendering

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Users, Calendar, MapPin, Euro, Plus, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import EditMissionModal from "./EditMissionModal";
import AddMissionModal from "./AddMissionModal";

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "filled":
      return "bg-blue-100 text-blue-700";
    case "draft":
      return "bg-gray-100 text-gray-700";
    case "expired":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "active":
      return "Active";
    case "filled":
      return "Pourvue";
    case "draft":
      return "Brouillon";
    case "expired":
      return "Expirée";
    default:
      return status;
  }
}

export default function MissionsList() {
  const [missions, setMissions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  // form state moved to AddMissionModal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employerId, setEmployerId] = useState<string | null>(null);
  const [editMission, setEditMission] = useState<any | null>(null);


  // Edit mission handler (opens modal)
  function handleEditMission(mission: any) {
    setEditMission(mission);
    setShowForm(false);
  }
  
  // Fetch missions from DB
  useEffect(() => {
    if (!employerId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/missions?employerId=${employerId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setMissions(data.missions || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des missions");
        setLoading(false);
      });
  }, [employerId]);


  // Delete mission handler
async function handleDeleteMission(id: string) { 
    console.log(missions)
  if (!window.confirm("Supprimer cette mission ?")) return;
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`/api/missions/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression de la mission");

    // Instead of fetching again, just update state locally
    setMissions((prev) => prev.filter((mission) => mission.id !== id));
  } catch (err) {
    setError("Erreur lors de la suppression de la mission");
  } finally {
    setLoading(false);
  }
}

  // Fetch employerId from profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        setEmployerId(data.user?.id || null);
      } catch (err) {
        setError("Impossible de charger le profil utilisateur");
      }
    }
    fetchProfile();
  }, []);


 return (
    <Card className="relative shadow-2xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 transform transition-all duration-300 hover:scale-[1.02]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      <CardHeader className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white p-8 relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-extrabold tracking-tight">
              Missions
            </CardTitle>
            <CardDescription className="text-blue-100 text-sm mt-1 font-medium">
              Gérez vos offres de remplacement avec élégance
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white text-blue-700 hover:bg-blue-100 font-semibold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle mission
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Add Mission Modal */}
        <AddMissionModal
          showForm={showForm}
          setShowForm={setShowForm}
          setMissions={setMissions}
          employerId={employerId}
          setLoading={setLoading}
          setError={setError}
        />

        {/* Data States */}
        {loading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            Chargement des missions...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500 font-medium">{error}</div>
        ) : missions.length === 0 ? (
          <div className="py-12 text-center text-gray-400 font-medium">
            Aucune mission trouvée. Créez-en une pour commencer !
          </div>
        ) : (
          <div className="space-y-6">
            {missions.map((mission) => (
              <Card
                key={mission.id}
                className="hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Mission Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="font-bold text-xl text-gray-900">
                          {mission.title}
                        </h3>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                          {mission.specialty_required || mission.specialty}
                        </Badge>
                        <Badge className={`${getStatusColor(mission.status)} rounded-full`}>
                          {String(getStatusText(mission.status))}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          {mission.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          {mission.start_date || mission.startDate} -{" "}
                          {mission.end_date || mission.endDate}
                        </span>
                        <span className="flex items-center gap-2">
                          <Euro className="w-5 h-5 text-indigo-500" />
                          {mission.daily_rate || mission.dailyRate}€/jour
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-pink-500" />
                          {mission.applicants ?? 0} candidature(s)
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {mission.description}
                      </p>

                      {mission.selectedDoctor && (
                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <CheckCircle className="w-5 h-5" />
                          Assigné à {mission.selectedDoctor}
                        </div>
                      )}

                      <div className="text-xs text-gray-500 mt-3">
                        Publié le {mission.posted_date || mission.postedDate}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row md:flex-col gap-3 self-end md:self-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMission(mission)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full px-5 py-2 shadow-sm transition-all duration-200"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 rounded-full px-5 py-2 shadow-sm transition-all duration-200"
                        onClick={() => handleDeleteMission(mission.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
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
          employerId={employerId}
          setEditMission={setEditMission}
          setMissions={setMissions}
          setLoading={setLoading}
          setError={setError}
        />
      </CardContent>
    </Card>
);

}
 