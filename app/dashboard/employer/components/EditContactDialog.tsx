import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

export default function EditContactDialog({ open, onOpenChange, form, setForm, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-green-900 text-2xl font-bold mb-2">Modifier les informations de contact</DialogTitle>
        </DialogHeader>
        <form className="space-y-5 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-green-800 font-semibold">Prénom</Label>
              <Input value={form?.firstName || ""} onChange={e => setForm((f: typeof form) => ({ ...f, firstName: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
            </div>
            <div>
              <Label className="text-green-800 font-semibold">Nom</Label>
              <Input value={form?.lastName || ""} onChange={e => setForm((f: typeof form) => ({ ...f, lastName: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
            </div>
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Fonction</Label>
            <Input value={form?.fonction || ""} onChange={e => setForm((f: typeof form) => ({ ...f, fonction: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Email</Label>
            <Input value={form?.email || ""} onChange={e => setForm((f: typeof form) => ({ ...f, email: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Téléphone</Label>
            <Input value={form?.phone || ""} onChange={e => setForm((f: typeof form) => ({ ...f, phone: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Années d'expérience</Label>
            <Input type="number" min="0" value={form?.experience_years || ""} onChange={e => setForm((f: typeof form) => ({ ...f, experience_years: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Langues parlées (séparées par des virgules)</Label>
            <Input value={form?.languages || ""} onChange={e => setForm((f: typeof form) => ({ ...f, languages: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Bio</Label>
            <Input value={form?.bio || ""} onChange={e => setForm((f: typeof form) => ({ ...f, bio: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Disponible</Label>
            <select value={form?.is_available === true ? "true" : form?.is_available === false ? "false" : ""} onChange={e => setForm((f: typeof form) => ({ ...f, is_available: e.target.value === "true" }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow">
              <option value="">--</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Début disponibilité</Label>
            <Input type="date" value={form?.availability_start || ""} onChange={e => setForm((f: typeof form) => ({ ...f, availability_start: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Fin disponibilité</Label>
            <Input type="date" value={form?.availability_end || ""} onChange={e => setForm((f: typeof form) => ({ ...f, availability_end: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
        </form>
        <DialogFooter className="mt-6">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow text-xl" onClick={onSave}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
