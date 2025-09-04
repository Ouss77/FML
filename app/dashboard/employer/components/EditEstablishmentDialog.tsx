import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

export default function EditEstablishmentDialog({ open, onOpenChange, form, setForm, onSave }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-white border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-900 text-2xl font-bold mb-2">Modifier les informations de l'établissement</DialogTitle>
        </DialogHeader>
        <form className="space-y-5 mt-2">
          <div>
            <Label className="text-blue-800 font-semibold">Nom de l'établissement</Label>
            <Input value={form?.establishmentName || ""} onChange={e => setForm(f => ({ ...f, establishmentName: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-blue-200 focus:border-blue-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-blue-800 font-semibold">Type d'établissement</Label>
            <Select value={form?.establishmentType || ""} onValueChange={value => setForm(f => ({ ...f, establishmentType: value }))}>
              <SelectTrigger className="mt-1 h-12 text-lg px-4 border-blue-200 focus:border-blue-500 bg-white/90 rounded-lg shadow">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital">Hôpital public</SelectItem>
                <SelectItem value="clinic">Clinique privée</SelectItem>
                <SelectItem value="cabinet">Cabinet médical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-blue-800 font-semibold">Adresse</Label>
            <Textarea value={form?.address || ""} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} rows={2} className="mt-1 text-lg px-4 border-blue-200 focus:border-blue-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-blue-800 font-semibold">SIRET</Label>
            <Input value={form?.siret || ""} onChange={e => setForm(f => ({ ...f, siret: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-blue-200 focus:border-blue-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-blue-800 font-semibold">Description</Label>
            <Textarea value={form?.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="mt-1 text-lg px-4 border-blue-200 focus:border-blue-500 bg-white/90 rounded-lg shadow" />
          </div>
        </form>
        <DialogFooter className="mt-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow text-xl" onClick={onSave}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
