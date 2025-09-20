import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import MissionFilterBar from "./MissionFilterBar";
import MissionCard from "./MissionCard";
import MissionContactDialog from "./MissionContactDialog";

export default function AvailableMissionsSection() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<any[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<any[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [applyStatus, setApplyStatus] = useState<{ [missionId: string]: string }>({});
  const [appliedMissions, setAppliedMissions] = useState<Set<string>>(new Set());

  const handleApply = async (missionId: string) => {
    if (!user?.id) {
      setApplyStatus((prev) => ({ ...prev, [missionId]: "Vous devez être connecté pour postuler." }));
      return;
    }
    setApplyStatus((prev) => ({ ...prev, [missionId]: "Envoi en cours..." }));
    try { 
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionId, userId: user.id }),
      });
      if (!res.ok) throw new Error("Erreur lors de la candidature");
      setApplyStatus((prev) => ({ ...prev, [missionId]: "Candidature envoyée !" }));
    } catch (err) {
      setApplyStatus((prev) => ({ ...prev, [missionId]: "Erreur lors de la candidature" }));
    }
  };

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

  // Filter missions when filters or missions change
  useEffect(() => {
    let filtered = missions;
    if (specialtyFilter) {
      filtered = filtered.filter(m => (m.specialty_required || "").toLowerCase().includes(specialtyFilter.toLowerCase()));
    }
    if (locationFilter) {
      filtered = filtered.filter(m => (m.location || "").toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (keywordFilter) {
      filtered = filtered.filter(m =>
        (m.title || "").toLowerCase().includes(keywordFilter.toLowerCase()) ||
        (m.description || "").toLowerCase().includes(keywordFilter.toLowerCase())
      );
    }
    setFilteredMissions(filtered);
  }, [missions, specialtyFilter, locationFilter, keywordFilter]);

  // Fetch applications for the current user and mark applied missions
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/applications?userId=${user.id}`);
        if (!res.ok) return;
        const data = await res.json(); 
        console.log(" the applied persons are", data);
        const applied = new Set<string>((data.applications || []).map((a: any) => String(a.mission_id)));
        setAppliedMissions(applied);
      } catch (err) {
        // ignore
      }
    };
    fetchApplications();
  }, [user]);


  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-3xl overflow-hidden border border-gray-200">
      <CardContent className="p-8">
        {/* Filter Bar */}
        <MissionFilterBar
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          keywordFilter={keywordFilter}
          setKeywordFilter={setKeywordFilter}
        />

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
            {filteredMissions.length === 0 ? (
              <div className="col-span-full text-gray-500 text-center py-12 text-lg font-medium">
                Aucune mission disponible pour le moment.
              </div>
            ) : (
              filteredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onContact={(m) => { setSelectedMission(m); setContactOpen(true); }}
                  onApply={handleApply}
                  applied={appliedMissions.has(mission.id)}
                  applyStatus={applyStatus[mission.id]}
                />
              ))
            )}
          </div>
        )}
      </CardContent>
      <MissionContactDialog open={contactOpen} onOpenChange={setContactOpen} mission={selectedMission} />
    </Card>
  );
} 