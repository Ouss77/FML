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
              <Input value={form?.firstName || ""} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
            </div>
            <div>
              <Label className="text-green-800 font-semibold">Nom</Label>
              <Input value={form?.lastName || ""} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
            </div>
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Fonction</Label>
            <Input value={form?.fonction || ""} onChange={e => setForm(f => ({ ...f, fonction: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Email</Label>
            <Input value={form?.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
          </div>
          <div>
            <Label className="text-green-800 font-semibold">Téléphone</Label>
            <Input value={form?.phone || ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="mt-1 h-12 text-lg px-4 border-green-200 focus:border-green-500 bg-white/90 rounded-lg shadow" />
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
