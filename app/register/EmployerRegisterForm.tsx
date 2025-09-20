import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Mail, Phone, Building, MapPin } from "lucide-react";

interface EmployerRegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    companyType: string;
    location: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    profession: string;
  };
  setFormData: (data: any) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleInputChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  companyTypes: string[];
}

export default function EmployerRegisterForm({
  formData,
  showPassword,
  setShowPassword,
  handleInputChange,
  handleSubmit,
  companyTypes,
}: EmployerRegisterFormProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl space-y-8 border border-gray-200"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Inscription Employeur</h2>
          <p className="text-gray-500 text-sm mt-1">
            Créez un compte pour publier vos offres
          </p>
        </div>

        {/* Personal Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Prénom"
            />
          </div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Nom"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Adresse email"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Téléphone"
            />
          </div>


          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Nom de l'établissement"
            />
            
          </div>
            <div className="relative ">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              className="pl-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Ville ou région"
            />
          </div>
          
          <Select
            value={formData.companyType}
            onValueChange={(value) => handleInputChange("companyType", value)}
          >
            <SelectTrigger className="!h-12 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded">
              <SelectValue placeholder="Type d'établissement" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map((type: string) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
        <div className="relative">
          <Select
            value={formData.profession}
            onValueChange={(value) => handleInputChange("profession", value)}
            required
          >
            <SelectTrigger className="!h-12 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded">
              <SelectValue placeholder="Sélectionner une profession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Médecin">Médecin</SelectItem>
              <SelectItem value="Dentiste">Dentiste</SelectItem>
              <SelectItem value="Kinésithérapeute">Kinésithérapeute</SelectItem>
              <SelectItem value="Infirmier">Infirmier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        </section>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className="pr-12 pl-4 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded"
              placeholder="Mot de passe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Masquer" : "Afficher"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) =>
              handleInputChange("acceptTerms", checked as boolean)
            }
            className="border-gray-300 rounded focus:ring-blue-500 mt-1"
          />
          <span className="text-sm text-gray-600 leading-5">
            J'accepte les{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </a>{" "}
            et la{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              politique de confidentialité
            </a>
            .
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow-md transition duration-300 disabled:opacity-50"
          disabled={!formData.acceptTerms}
        >
          Créer mon compte
        </Button>
      </form>
    </div>
  );
}
