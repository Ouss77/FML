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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gradient-to-br from-white to-blue-50 p-10 rounded-3xl shadow-2xl max-w-4xl border border-blue-200"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Inscription Employeur</h2>
        <p className="text-lg text-gray-600 mt-3">Rejoignez notre plateforme pour recruter des remplaçants médicaux</p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-lg font-bold text-gray-800">
            Prénom *
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="Votre prénom"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-lg font-bold text-gray-800">
            Nom *
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="Votre nom"
            />
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email" className="text-lg font-bold text-gray-800">
            Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="votre@email.com"
            />
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="phone" className="text-lg font-bold text-gray-800">
            Téléphone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="+33 1 23 45 67 89"
            />
          </div>
        </div>
      </div>

      {/* Establishment Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-lg font-bold text-gray-800">
            Nom de l'établissement *
          </Label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="Nom de l'établissement"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyType" className="text-lg font-bold text-gray-800">
            Type d'établissement *
          </Label>
          <Select
            value={formData.companyType}
            onValueChange={(value) => handleInputChange("companyType", value)}
          >
            <SelectTrigger className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-600 rounded-xl py-4 text-lg">
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map((type: string) => (
                <SelectItem key={type} value={type} className="text-lg">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="siret" className="text-lg font-bold text-gray-800">
            SIRET
          </Label>
          <Input
            id="siret"
            value={formData.siret}
            onChange={(e) => handleInputChange("siret", e.target.value)}
            className="py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-600 rounded-xl transition-all duration-300 shadow-sm"
            placeholder="12345678901234"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location" className="text-lg font-bold text-gray-800">
            Localisation *
          </Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-600 rounded-xl transition-all duration-300 shadow-sm"
              placeholder="Adresse complète"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg font-bold text-gray-800">
          Description de l'établissement
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-pink-600 rounded-xl py-4 text-lg min-h-[100px] resize-none"
          placeholder="Présentez votre établissement..."
          rows={3}
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-lg font-bold text-gray-800">
            Mot de passe *
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className="py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl pr-12 transition-all duration-300 shadow-sm"
              placeholder="••••••••"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6 text-gray-400" />
              ) : (
                <Eye className="h-6 w-6 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-lg font-bold text-gray-800">
            Confirmer le mot de passe *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            required
            className="py-4 text-lg bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl transition-all duration-300 shadow-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
          className="h-6 w-6 border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        <Label htmlFor="acceptTerms" className="text-lg text-gray-600">
          J'accepte les{" "}
          <a href="/terms" className="text-blue-600 hover:underline font-semibold">
            conditions d'utilisation
          </a>{" "}
          et la{" "}
          <a href="/privacy" className="text-blue-600 hover:underline font-semibold">
            politique de confidentialité
          </a>
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full py-5 text-xl font-bold shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!formData.acceptTerms}
      >
        Créer mon compte employeur
      </Button>
    </form>
  );
}