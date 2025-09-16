import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DownloadCVButton } from "./DownloadCVButton";
import { MessageCircle, Mail, Phone } from "lucide-react";

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

  const missionsWithApplications = missions.filter(
    (mission) => applicationsByMission[mission.id]?.length > 0
  );

  if (!missionsWithApplications.length)
    return <div>Aucune candidature reçue pour vos missions.</div>;

  return (
    <div className="space-y-12">
  {missionsWithApplications.map((mission) => (
    <div key={mission.id}>
      {/* Mission Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">{mission.title}</h2>
        <p className="text-sm text-gray-500">
          Candidats pour cette mission
        </p>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applicationsByMission[mission.id].map((app: any) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col"
          >
            {/* Content Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
              {/* Candidate Photo */}
              <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={app.photo_url || "/placeholder-user.jpg"}
                  alt={`${app.first_name} ${app.last_name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Candidate Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {app.first_name} {app.last_name}
                </h3>

                {app.specialty && (
                  <Badge className="mt-2 bg-indigo-50 text-indigo-700 rounded-lg px-3 py-1 text-xs">
                    {app.specialty}
                  </Badge>
                )}

                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  {app.email && (
                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {app.email}
                    </p>
                  )}
                  {app.phone && (
                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {app.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t border-gray-100 p-4">
              <DownloadCVButton userId={app.user_id || app.id} />

              {app.phone && (
                <a
                  href={`https://wa.me/${app.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

  );
}
