import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface Diploma {
  id: string;
  title: string;
  institution: string;
  year?: string;
  description?: string;
}

export default function DiplomasSection() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    institution: "",
    year: "",
    description: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchDiplomas();
  }, []);

  const fetchDiplomas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users/diplomas");
      if (!res.ok) throw new Error("Erreur lors du chargement des diplômes");
      const data = await res.json();
      setDiplomas(data.diplomas || []);
    } catch (err) {
      setError("Erreur lors du chargement des diplômes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDiploma = async () => {
    if (!form.title || !form.institution) return;
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/users/diplomas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout du diplôme");
      setForm({ title: "", institution: "", year: "", description: "" });
      setOpenDialog(false);
      setSuccess("Diplôme ajouté avec succès ! Il sera vérifié par l'administration.");
      fetchDiplomas();
    } catch (err) {
      setError("Erreur lors de l'ajout du diplôme");
    }
  };

  // Delete diploma handler
  const handleDeleteDiploma = async (id: string) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/users/diplomas/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression du diplôme");
      setSuccess("Diplôme supprimé avec succès.");
      fetchDiplomas();
    } catch (err) {
      setError("Erreur lors de la suppression du diplôme");
    }
  };

  return (
  <Card className="mb-6 mt-0 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-white scale-[0.9] text-[0.92rem]">
  <CardHeader className="flex flex-row items-center gap-3 pb-0 text-sm">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
          <GraduationCap className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-bold text-blue-900">Diplômes & Formations</CardTitle>
          <CardDescription className="text-blue-700 text-xs">Vos diplômes, certificats, universités, forums...</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => setOpenDialog(true)}>
          <Plus className="w-4 h-4 mr-1" /> Ajouter
        </Button>
      </CardHeader>
  <CardContent className="text-xs">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{success}</div>}
        {loading ? (
          <div className="text-gray-500">Chargement des diplômes...</div>
        ) : (
          <div className="space-y-4 mt-2">
            {diplomas.length === 0 ? (
              <div className="text-gray-500 text-center">Aucun diplôme ou formation ajouté.</div>
            ) : (
              diplomas.map((diploma) => (
                <div key={diploma.id} className="bg-white border border-gray-100 shadow-sm rounded-xl p-2 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition text-xs">
                  <div className="flex-1">
                    <div className="font-semibold text-base text-blue-900 flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      {diploma.title}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {diploma.institution} {diploma.year && <span className="text-gray-400">({diploma.year})</span>}
                    </div>
                    {diploma.description && <div className="text-gray-500 text-xs mt-1">{diploma.description}</div>}
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 md:ml-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:bg-red-100"
                      title="Supprimer"
                      onClick={() => handleDeleteDiploma(diploma.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-blue-900 text-3xl font-bold mb-2">Ajouter un diplôme ou une formation</DialogTitle>
              <CardDescription className="text-blue-700 mb-4 text-lg">Ajoutez un diplôme, certificat, université, forum, etc.</CardDescription>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-base text-blue-800">Titre du diplôme ou certificat</label>
                <Input className="mt-2 h-14 text-xl px-5" name="title" value={form.title} onChange={handleChange} />
              </div>
              <div>
                <label className="text-base text-blue-800">Université, forum, organisme</label>
                <Input className="mt-2 h-14 text-xl px-5" name="institution" value={form.institution} onChange={handleChange} />
              </div>
              <div>
                <label className="text-base text-blue-800">Année d'obtention</label>
                <Input className="mt-2 h-14 text-xl px-5" name="year" value={form.year} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <label className="text-base text-blue-800">Description, mentions, détails</label>
                <Textarea className="mt-2 h-28 text-lg px-5" name="description" value={form.description} onChange={handleChange} />
              </div>
            </form>
            <DialogFooter className="mt-8">
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow text-xl" onClick={handleAddDiploma}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
