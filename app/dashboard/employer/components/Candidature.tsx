import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CandidatureProps {
  missions: any[];
}

export default function Candidature({ missions }: CandidatureProps) {
  const [applicationsByMission, setApplicationsByMission] = useState<{ [missionId: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllApplications() {
      setLoading(true);
      setError("");
      try {
        const results: { [missionId: string]: any[] } = {};
        for (const mission of missions) {
          const res = await fetch(`/api/applications?missionId=${mission.id}`);
          if (res.ok) { 
            const data = await res.json();
                console.log("the data of the applied persons are", data)
            results[mission.id] = data.applications || [];
          } else {
            results[mission.id] = [];
          }
        }
        setApplicationsByMission(results);
      } catch (err) {
        setError("Erreur lors du chargement des candidatures");
      } finally {
        setLoading(false);
      }
    }
    if (missions.length > 0) fetchAllApplications();
    else setLoading(false);
  }, [missions]);

  if (loading) return <div>Chargement des candidatures...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!missions.length) return <div>Aucune mission trouvée.</div>;

  // Filter missions to only those with at least one application
  const missionsWithApplications = missions.filter(
    (mission) => applicationsByMission[mission.id]?.length > 0
  );

  if (!missionsWithApplications.length) return <div>Aucune candidature reçue pour vos missions.</div>;

  return (
    <div className="space-y-8">
      {missionsWithApplications.map((mission) => (
        <div key={mission.id} className="mb-12">
          <div className="mb-4">
            <span className=" text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mission: </span>
            <span className="text-xl font-bold text-indigo-700">{mission.title}</span>
          </div>
          <div className="mb-3">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Candidats pour cette mission :</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-start">
            {applicationsByMission[mission.id].map((app: any) => (
              <div
                key={app.id}
                className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-2xl shadow-lg p-4 flex flex-col items-center w-64 hover:shadow-xl transition-all duration-200"
              >
                <Avatar className="w-14 h-14 mb-2 shadow-md ring-2 ring-indigo-200">
                  <AvatarImage src={app.photo_url || "/placeholder-user.jpg"} />
                  <AvatarFallback>
                    {app.first_name?.[0]}{app.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-indigo-800 text-lg mb-1 truncate">{app.first_name} {app.last_name}</span>
                {app.specialty && <Badge className="mb-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs font-medium rounded">{app.specialty}</Badge>}
                <span className="text-xs text-gray-500 mb-1 truncate">{app.email}</span>
                <span className="text-xs text-gray-400 mb-2 truncate">{app.phone}</span>
                {/* Add more info/actions if needed */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
