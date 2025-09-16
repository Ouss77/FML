import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, MapPin, Building2 } from "lucide-react";
import { formatDate } from "./utils";

interface MissionCardProps {
  mission: any;
  onContact: (mission: any) => void;
  onApply: (missionId: string) => void;
  applied: boolean;
  applyStatus: string | undefined;
}

export default function MissionCard({ mission, onContact, onApply, applied, applyStatus }: MissionCardProps) {
  return ( 
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
          {mission.title || "Mission"}
        </h3>
        {/* Employer/Hospital name */}
        {(mission.organization_name || mission.first_name || mission.last_name) && (
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-medium text-xs shadow-sm border border-blue-100">
              <Building2 className="w-4 h-4 text-blue-400" />
              {mission.organization_name
                ? mission.organization_name
                : [mission.first_name, mission.last_name].filter(Boolean).join(" ")}
            </span>
          </div>
        )}
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
          {mission.start_date && mission.end_date && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-900 font-semibold px-3 py-1.5 rounded-full"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {(() => {
                const start = new Date(mission.start_date);
                const end = new Date(mission.end_date);
                const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                return `${diff} jour${diff > 1 ? 's' : ''}`;
              })()}
            </Badge>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-colors duration-200"
            onClick={() => onContact(mission)}
          >
            Contacter
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-indigo-600 text-indigo-700 font-semibold hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-colors duration-200"
            onClick={() => onApply(mission.id)}
            disabled={applied || (!!applyStatus && applyStatus !== "Erreur lors de la candidature")}
          >
            {applied || applyStatus?.startsWith("Candidature") ? "Deja postulé" : "Postuler"}
          </Button>
        </div>
        {applyStatus && (
          <div className={`mt-2 text-sm ${applyStatus.startsWith("Candidature") ? "text-green-600" : "text-red-600"}`}>
            {applyStatus}
          </div>
        )}
      </div>
    </div>
  );
}
