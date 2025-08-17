
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { User } from "lucide-react"
 

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

interface ProfileSectionProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  handleSaveProfile: () => void;
}


export default function ProfileSection({ profileData, setProfileData, isEditProfileOpen, setIsEditProfileOpen, handleSaveProfile }: ProfileSectionProps) {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="flex flex-row items-center gap-4 pb-0">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
          <User className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-blue-900">Profil Médecin</CardTitle>
          <CardDescription className="text-blue-700">Informations personnelles</CardDescription>
        </div>
        <div className="flex-1 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
            Modifier
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label className="text-xs text-blue-800">Prénom</Label>
            <div className="font-semibold text-lg text-gray-900 mb-2">{profileData.firstName}</div>
            <Label className="text-xs text-blue-800">Email</Label>
            <div className="text-gray-700 mb-2">{profileData.email}</div>
            <Label className="text-xs text-blue-800">Spécialité</Label>
            <div className="text-gray-700 mb-2">{profileData.specialty}</div>
          </div>
          <div>
            <Label className="text-xs text-blue-800">Nom</Label>
            <div className="font-semibold text-lg text-gray-900 mb-2">{profileData.lastName}</div>
            <Label className="text-xs text-blue-800">Téléphone</Label>
            <div className="text-gray-700 mb-2">{profileData.phone}</div>
            <Label className="text-xs text-blue-800">Localisation</Label>
            <div className="text-gray-700 mb-2">{profileData.location}</div>
          </div>
        </div>
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-blue-900 text-2xl font-bold mb-2">Modifier le profil</DialogTitle>
              <CardDescription className="text-blue-700 mb-4">Mettez à jour vos informations personnelles</CardDescription>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs text-blue-800">Prénom</Label>
                <Input className="mt-1" value={profileData.firstName} onChange={e => setProfileData((prev:any) => ({ ...prev, firstName: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Nom</Label>
                <Input className="mt-1" value={profileData.lastName} onChange={e => setProfileData((prev:any) => ({ ...prev, lastName: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Email</Label>
                <Input className="mt-1" value={profileData.email} onChange={e => setProfileData((prev:any) => ({ ...prev, email: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs text-blue-800">Téléphone</Label>
                <Input className="mt-1" value={profileData.phone} onChange={e => setProfileData((prev:any) => ({ ...prev, phone: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-blue-800">Spécialité</Label>
                <Input className="mt-1" value={profileData.specialty} onChange={e => setProfileData((prev:any) => ({ ...prev, specialty: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-blue-800">Localisation</Label>
                <Input className="mt-1" value={profileData.location} onChange={e => setProfileData((prev:any) => ({ ...prev, location: e.target.value }))} />
              </div>
            </form>
            <DialogFooter className="mt-6">
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow" onClick={handleSaveProfile}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
