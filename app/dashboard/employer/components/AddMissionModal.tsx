import { useState } from "react";
import { Briefcase, Calendar, Euro, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddMissionModal({ showForm, setShowForm, setMissions, employerId, setLoading, setError }) {
  const [form, setForm] = useState({
    title: "",
    specialty: "",
    startDate: "",
    endDate: "",
    dailyRate: "",
    location: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          specialtyRequired: form.specialty,
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate,
          dailyRate: form.dailyRate,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout de la mission");
      const missionsRes = await fetch(`/api/missions?employerId=${employerId}`, { credentials: "include" });
      const missionsData = await missionsRes.json();
      setMissions(missionsData.missions || []);
      setForm({ title: "", specialty: "", startDate: "", endDate: "", dailyRate: "", location: "", description: "" });
      setShowForm(false);
    } catch (err) {
      setError("Erreur lors de l'ajout de la mission");
    } finally {
      setLoading(false);
    }
  }

  if (!showForm) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setShowForm(false)} // Close modal when clicking outside
    >
      <Card
        className="relative w-full max-w-2xl rounded-2xl bg-white/95 shadow-xl p-6 md:p-8 transform-none"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
      >
        <CardHeader className="p-0 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Fermer"
          >
            <span className="text-2xl font-bold">×</span>
          </Button>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Nouvelle mission
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Titre
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="pl-10 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg transition-all"
                    placeholder="Entrez le titre de la mission"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                  Spécialité
                </Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  required
                  className="py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg transition-all"
                  placeholder="Entrez la spécialité"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Date de début
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="pl-10 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  Date de fin
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="pl-10 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyRate" className="text-sm font-medium text-gray-700">
                  Tarif journalier (€)
                </Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="dailyRate"
                    type="number"
                    name="dailyRate"
                    value={form.dailyRate}
                    onChange={handleChange}
                    required
                    className="pl-10 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg transition-all"
                    placeholder="Entrez le tarif"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Lieu
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="pl-10 py-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg transition-all"
                    placeholder="Entrez le lieu"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-lg transition-all resize-none"
                placeholder="Décrivez la mission..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="rounded-full bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 font-semibold transition-all"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 font-semibold shadow-md transition-all"
              >
                Ajouter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}