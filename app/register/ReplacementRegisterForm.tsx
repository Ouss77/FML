import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, MapPin, Calendar, Eye, EyeOff } from "lucide-react";

interface ReplacementRegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialty: string;
    location: string;
    availability: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };
  setFormData: (data: any) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleInputChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  specialties: string[];
}

export default function ReplacementRegisterForm({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  handleInputChange,
  handleSubmit,
  specialties,
}: ReplacementRegisterFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full space-y-8 border border-gray-200 "
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Inscription Remplaçant</h2>
        </div>

        {/* Personal Information Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations Personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="pl-14 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Prénom (ex: Jean)"
              />
            </div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="pl-14 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Nom (ex: Dupont)"
              />
            </div>
            <div className="relative ">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="pl-14 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Adresse email professionnelle"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="pl-14 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Numéro de téléphone (ex: +33 6 12 34 56 78)"
              />
            </div>
          </div>
        </section>

        {/* Professional Information Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations Professionnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={formData.specialty}
              onValueChange={(value) => handleInputChange("specialty", value)}
            >
              <SelectTrigger className="h-16 !text-2xl  py-8 placeholder:!text-lg border-gray-300 
                                        focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                <SelectValue placeholder="Sélectionnez votre spécialité" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty: string) => (
                  <SelectItem key={specialty} value={specialty} className="text-xl">
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
                className="pl-14 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Ville, département ou région (ex: Paris, 75)"
              />
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Disponibilités</h3>
          <div className="relative">
            <Calendar className="absolute left-4 top-6 text-gray-400 h-6 w-6" />
            <Textarea
              id="availability"
              value={formData.availability}
              onChange={(e) => handleInputChange("availability", e.target.value)}
              className="pl-14 pt-5 h-32 !text-2xl placeholder:!text-lg border-gray-300 
                         focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              placeholder="Décrivez vos disponibilités (ex: Disponible les weekends, vacances scolaires...)"
            />
          </div>
        </section>

        {/* Security Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Sécurité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="pr-12 pl-6 h-16 !text-2xl placeholder:!text-lg border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Créer un mot de passe sécurisé"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              required
              className="h-16 !text-2xl placeholder:!text-lg border-gray-300 
                         focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              placeholder="Confirmez votre mot de passe"
            />
          </div>
        </section>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
            className="border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            J'accepte les{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </a>{" "}
            et la{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              politique de confidentialité
            </a>
          </span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
          disabled={!formData.acceptTerms}
        >
          Créer mon compte
        </Button>
      </form>
    </div>
  );
}
