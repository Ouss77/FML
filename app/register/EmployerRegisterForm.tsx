
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    siret: string;
    location: string;
    description: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
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
  setFormData,
  showPassword,
  setShowPassword,
  handleInputChange,
  handleSubmit,
  companyTypes,
}: EmployerRegisterFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl  w-full space-y-8 border border-gray-200"
      >
        {/* Header with Image */}
        <div className="text-center space-y-4">

          <h2 className="text-3xl font-bold text-gray-900">Inscription Employeur</h2>
        </div>

        {/* Contact Information Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations de Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Votre prénom"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Téléphone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Establishment Information Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations sur l'Établissement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Nom de l'établissement *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Nom de l'établissement"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="companyType" className="text-sm font-medium text-gray-700">Type d'établissement *</Label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => handleInputChange("companyType", value)}
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map((type: string) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="siret" className="text-sm font-medium text-gray-700">SIRET</Label>
              <Input
                id="siret"
                value={formData.siret}
                onChange={(e) => handleInputChange("siret", e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="12345678901234"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">Localisation *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="Adresse complète"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Description</h3>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Présentez votre établissement</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg min-h-[120px]"
              placeholder="Décrivez votre établissement..."
            />
          </div>
        </section>

        {/* Security Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Sécurité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="••••••••"
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
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="••••••••"
              />
            </div>
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
          <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
            J'accepte les{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </a>{" "}
            et la{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              politique de confidentialité
            </a>
          </Label>
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
