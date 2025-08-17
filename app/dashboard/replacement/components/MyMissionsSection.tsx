
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Star, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
const formatMonthYear = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("fr-FR", { month: "long", year: "numeric" });
};


interface Experience {
  id: string;
  workplace_name: string;
  workplace_type: string;
  location: string;
  start_date: string;
  end_date?: string;
  duration_months?: number;
  specialty?: string;
  description?: string;
  reference_contact?: string;
  reference_phone?: string;
  reference_email?: string;
  rating?: number;}

export default function ExperienceSection() {

  const [openDialog, setOpenDialog] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Experience>>({});
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users/experiences");
      if (!res.ok) throw new Error("Erreur lors du chargement des expériences");
      const data = await res.json();
      setExperiences(data.experiences || []);
      console.log("Fetched experiences:", data.experiences);
    } catch (err) {
      setError("Erreur lors du chargement des expériences");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setForm({});
    setEditId(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setForm({ ...exp });
    setEditId(exp.id);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    setError("");
    try {
      const payload = {
        workplaceName: form.workplace_name || "",
        workplaceType: form.workplace_type || "",
        location: form.location || "",
        startDate: form.start_date || "",
        endDate: form.end_date,
        durationMonths: form.duration_months,
        specialty: form.specialty,
        description: form.description,
        referenceContact: form.reference_contact,
        referencePhone: form.reference_phone,
        referenceEmail: form.reference_email,
        rating: form.rating,
      };
      let res;
      if (editId) {
        res = await fetch(`/api/users/experiences/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erreur lors de la modification de l'expérience");
      } else {
        res = await fetch("/api/users/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erreur lors de l'ajout de l'expérience");
      }
      setOpenDialog(false);
      setEditId(null);
      fetchExperiences();
    } catch (err) {
      setError(editId ? "Erreur lors de la modification de l'expérience" : "Erreur lors de l'ajout de l'expérience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer cette expérience ?")) return;
    setError("");
    try {
      const res = await fetch(`/api/users/experiences/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression de l'expérience");
      fetchExperiences();
    } catch (err) {
      setError("Erreur lors de la suppression de l'expérience");
    }
  };

  const handleChange = (field: keyof Experience, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="flex flex-row items-center gap-4 pb-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
          <Briefcase className="w-6 h-6 text-amber-500" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl font-bold text-amber-900">Expériences / Missions passées </CardTitle>
          <CardDescription className="text-amber-700">Historique de vos remplacements</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="ml-auto" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1" /> Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500 py-8">Chargement des expériences...</div>
        ) : (
          <div className="space-y-4 mt-2">
            {experiences.length === 0 ? (
              <div className="text-gray-500 text-center">Aucune expérience enregistrée.</div>
            ) : (
              <>
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition">
                    <div>
                      <div className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        {exp.workplace_name}
                      </div>
                      <div className="text-gray-600">
                        {exp.location} <span className="mx-1">•</span> {formatMonthYear(exp.start_date)}{exp.end_date ? ` - ${formatMonthYear(exp.end_date)}` : ""}
                      </div>
                      <div className="text-gray-500 text-sm">Type : {exp.workplace_type}</div>
                      <div className="text-gray-500 text-sm">Spécialité : {exp.specialty}</div>
                      <div className="text-gray-500 text-sm">Description : {exp.description}</div>
                      <div className="text-gray-400 text-xs mt-1">Référence contact : {exp.reference_contact}</div>
                      <div className="text-gray-400 text-xs mt-1">Référence téléphone : {exp.reference_phone}</div>
                      <div className="text-gray-400 text-xs mt-1">Référence email : {exp.reference_email}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <Badge className="bg-amber-100 text-amber-800 font-semibold px-3 py-1">{exp.duration_months ? `${exp.duration_months} mois` : ""}</Badge>
                      {exp.rating && (
                        <span className="flex items-center gap-1 text-yellow-600 font-bold text-lg">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {exp.rating}
                        </span>
                      )}
                      <Button size="icon" variant="ghost" className="text-amber-700 hover:bg-amber-100" onClick={() => handleOpenEdit(exp)} title="Modifier">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-600 hover:bg-red-100" onClick={() => handleDelete(exp.id)} title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        <Dialog open={openDialog} onOpenChange={(open) => { setOpenDialog(open); if (!open) setEditId(null); }}>
          <DialogContent className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-amber-900 text-2xl font-bold mb-2">{editId ? "Modifier l'expérience" : "Ajouter une expérience"}</DialogTitle>
              <CardDescription className="text-amber-700 mb-4">{editId ? "Modifiez les informations de cette expérience." : "Ajoutez une nouvelle expérience à votre historique."}</CardDescription>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div>
                <Label className="text-xs text-amber-800">Établissement</Label>
                <Input className="mt-1" value={form.workplace_name || ""} onChange={e => handleChange("workplace_name", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Type d'établissement</Label>
                <Input className="mt-1" value={form.workplace_type || ""} onChange={e => handleChange("workplace_type", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Localisation</Label>
                <Input className="mt-1" value={form.location || ""} onChange={e => handleChange("location", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Date de début</Label>
                <Input className="mt-1" type="date" value={form.start_date || ""} onChange={e => handleChange("start_date", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Date de fin</Label>
                <Input className="mt-1" type="date" value={form.end_date || ""} onChange={e => handleChange("end_date", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Durée (mois)</Label>
                <Input className="mt-1" type="number" min={0} value={form.duration_months || ""} onChange={e => handleChange("duration_months", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Spécialité</Label>
                <Input className="mt-1" value={form.specialty || ""} onChange={e => handleChange("specialty", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-amber-800">Description</Label>
                <Input className="mt-1" value={form.description || ""} onChange={e => handleChange("description", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Référence (contact)</Label>
                <Input className="mt-1" value={form.reference_contact || ""} onChange={e => handleChange("reference_contact", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Téléphone de référence</Label>
                <Input className="mt-1" value={form.reference_phone || ""} onChange={e => handleChange("reference_phone", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Email de référence</Label>
                <Input className="mt-1" value={form.reference_email || ""} onChange={e => handleChange("reference_email", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-amber-800">Note</Label>
                <Input className="mt-1" type="number" min={0} max={5} step={0.1} value={form.rating || ""} onChange={e => handleChange("rating", e.target.value)} />
              </div>
            </form>
            <DialogFooter className="mt-6">
              <Button className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={handleSave}>
                {editId ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
