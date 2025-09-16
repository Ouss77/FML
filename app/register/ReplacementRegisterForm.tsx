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
    <div className="bg-gradient-to-br flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow    w-full space-y-8 border border-gray-200 mt-0"
      >
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-2xl font-bold text-gray-900">Inscription Remplaçant</h2>
        </div>

        {/* Personal Information Section */}
        <section className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="pl-14 h-14 placeholder: border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
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
                className="pl-14 h-14      placeholder:    border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
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
                className="pl-14 h-14      placeholder:    border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
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
                className="pl-14 h-14      placeholder:    border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
                placeholder="Numéro de téléphone"
              />
            </div>
          </div>
        </section>

        {/* Professional Information Section */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={formData.specialty}
              onValueChange={(value) => handleInputChange("specialty", value)}
            >
              <SelectTrigger className="h-14       py-8 placeholder:    border-gray-300 
                                        focus:border-blue-500 focus:ring-blue-500 rounded  ">
                <SelectValue placeholder="Sélectionnez votre spécialité" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty: string) => (
                  <SelectItem key={specialty} value={specialty} className="text   ">
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
                className="pl-14 h-14      placeholder:    border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
                placeholder="Ville ou région "
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="pr-12 pl-6 h-14      placeholder:    border-gray-300 
                           focus:border-blue-500 focus:ring-blue-500 rounded  "
                placeholder="Créer un mot de passe "
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
              className="h-14      placeholder:    border-gray-300 
                         focus:border-blue-500 focus:ring-blue-500 rounded  "
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded   shadow-md transition duration-300 disabled:opacity-50"
          disabled={!formData.acceptTerms}
        >
          Créer mon compte
        </Button>
      </form>
    </div>
  );
}
