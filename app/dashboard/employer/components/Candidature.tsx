import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DownloadCVButton } from "./DownloadCVButton";
import {  Mail, Phone,  } from "lucide-react";

interface CandidatureProps {
  missions: any[];
}

export default function Candidature({ missions }: CandidatureProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [missionFilter, setMissionFilter] = useState("");

  useEffect(() => {
    async function fetchAllApplications() {
      setLoading(true);
      setError("");
      try {
        let allApps: any[] = [];
        for (const mission of missions) {
          const res = await fetch(`/api/applications?missionId=${mission.id}`);
          if (res.ok) {
            const data = await res.json(); 
            const apps = (data.applications || []).map((app: any) => ({ ...app, mission }));
            allApps = allApps.concat(apps);
            console.log(allApps)          }
        }
        setApplications(allApps);
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
  if (!applications.length) return <div>Aucune candidature reçue pour vos missions.</div>;

  // Filter logic
  const filteredApps = applications.filter(app => {
    const matchesSearch = search.trim() === "" || `${app.first_name} ${app.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchesMission = missionFilter === "" || app.mission.id === missionFilter;
    return matchesSearch && matchesMission;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un candidat..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/3"
        />
        <select
          value={missionFilter}
          onChange={e => setMissionFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/4"
        >
          <option value="">Toutes les missions</option>
          {missions.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Candidat</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Spécialité</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Mission</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Téléphone</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredApps.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={app.photo_url || "/placeholder-user.jpg"} />
                    <AvatarFallback>{app.first_name?.[0]}{app.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-gray-800">{app.first_name} {app.last_name}</span>
                </td>
                <td className="px-4 py-3">
                  {app.specialty ? (
                    <Badge className="bg-indigo-50 text-indigo-700 rounded-lg px-3 py-1 text-xs">{app.specialty}</Badge>
                  ) : (
                    <span className="text-gray-400 text-xs">Non renseignée</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-700">{app.mission.title}</span>
                </td>
                <td className="px-4 py-3">
                  {app.email ? (
                    <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{app.email}</span>
                  ) : (
                    <span className="text-gray-400 text-xs">Non renseigné</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {app.phone ? (
                    <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" />{app.phone}</span>
                  ) : (
                    <span className="text-gray-400 text-xs">Non renseigné</span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <DownloadCVButton userId={app.user_id || app.id} />
                  {app.phone && (
                    <a
                      href={`https://wa.me/${app.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                    >
                      <button className="flex items-center gap-2 mt-2 px-3 py-1 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition text-xs">
                        
                        <img  src="/whatsapp.png" alt="WhatsApp icon"  className="w-5 h-5" />

                      </button>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
