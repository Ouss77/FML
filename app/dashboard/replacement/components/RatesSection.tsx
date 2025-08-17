
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  hourlyRate: string;
  dailyRate: string;
  availability: string;
}

interface RatesSectionProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditRatesOpen: boolean;
  setIsEditRatesOpen: (open: boolean) => void;
  handleSaveRates: () => void;
}


export default function RatesSection({ profileData, setProfileData, isEditRatesOpen, setIsEditRatesOpen, handleSaveRates }: RatesSectionProps) {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="flex flex-row items-center gap-4 pb-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
          <span className="text-purple-500 text-2xl font-bold">€</span>
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-purple-900">Tarifs</CardTitle>
          <CardDescription className="text-purple-700">Vos tarifs horaires et journaliers</CardDescription>
        </div>
        <div className="flex-1 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsEditRatesOpen(true)}>
            Modifier
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <Label className="text-xs text-purple-800">Tarif horaire (€)</Label>
            <div className="font-semibold text-lg text-gray-900 mb-2">{profileData.hourlyRate}</div>
          </div>
          <div>
            <Label className="text-xs text-purple-800">Tarif journalier (€)</Label>
            <div className="font-semibold text-lg text-gray-900 mb-2">{profileData.dailyRate}</div>
          </div>
        </div>
        <Dialog open={isEditRatesOpen} onOpenChange={setIsEditRatesOpen}>
          <DialogContent className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-purple-900 text-2xl font-bold mb-2">Modifier les tarifs</DialogTitle>
              <CardDescription className="text-purple-700 mb-4">Mettez à jour vos tarifs horaires et journaliers</CardDescription>
            </DialogHeader>
            <form className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-xs text-purple-800">Tarif horaire (€)</Label>
                <Input className="mt-1" value={profileData.hourlyRate} onChange={e => setProfileData((prev:any) => ({ ...prev, hourlyRate: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs text-purple-800">Tarif journalier (€)</Label>
                <Input className="mt-1" value={profileData.dailyRate} onChange={e => setProfileData((prev:any) => ({ ...prev, dailyRate: e.target.value }))} />
              </div>
            </form>
            <DialogFooter className="mt-6">
              <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={handleSaveRates}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
