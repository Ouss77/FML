"use client";

import type React from "react";
import { useState, useEffect } from "react";
import EmployerRegisterForm from "./EmployerRegisterForm";
import ReplacementRegisterForm from "./ReplacementRegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"replacement" | "employer">("replacement");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    // Replacement doctor fields
    specialty: "",
    location: "",
    hourlyRate: "",
    dailyRate: "",
    availability: "",
    // Employer fields
    companyName: "",
    companyType: "",
    siret: "",
    description: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();

  // Retrieve type from URL if present (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeFromUrl = params.get("type");
      if (typeFromUrl === "replacement" || typeFromUrl === "employer") {
        setUserType(typeFromUrl as "replacement" | "employer");
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string | boolean | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Vous devez accepter les conditions d'utilisation");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          specialty: formData.specialty,
          location: formData.location,
          hourlyRate: formData.hourlyRate,
          dailyRate: formData.dailyRate,
          availability: formData.availability,
          companyName: formData.companyName,
          companyType: formData.companyType,
          siret: formData.siret,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          if (userType === "replacement") {
            router.push("/dashboard/replacement");
          } else {
            router.push("/dashboard/employer");
          }
        }, 2000);
      } else {
        alert(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  const specialties = [
    "Médecine générale",
    "Cardiologie",
    "Dermatologie",
    "Gynécologie",
    "Pédiatrie",
    "Psychiatrie",
    "Radiologie",
    "Anesthésie",
    "Chirurgie générale",
    "Urgences",
  ];

  const companyTypes = [
    "Hôpital public",
    "Clinique privée",
    "Cabinet médical",
    "Maison de santé",
    "Centre de soins",
    "EHPAD",
    "Médecin indépendant",
  ];

  return (
    <div className="min-h-screen flex items-stretch bg-gray-50">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Compte créé avec succès !</h3>
            <p className="text-lg text-gray-600 mb-6">
              Bienvenue sur  Le Foyer Médical ! Votre compte {userType === "replacement" ? "médecin remplaçant" : "établissement"} a été créé.
            </p>
            <p className="text-base text-gray-500">Redirection vers votre tableau de bord...</p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left side: Attractive message */}
      <div className="hidden lg:flex flex-col items-center w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-12 pt-16">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-wide">MedReplace</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Rejoignez la communauté MedReplace</h2>
          <p className="text-xl mb-8 font-medium drop-shadow">
            Inscrivez-vous dès aujourd'hui et profitez d'un service <span className="font-bold text-yellow-200">100% gratuit</span> pour trouver ou proposer des remplacements médicaux en toute simplicité.
          </p>
          <ul className="text-left text-lg space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full"></span>
              Mise en relation rapide et sécurisée
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full"></span>
              Plateforme dédiée aux professionnels de santé
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full"></span>
              Aucun frais caché, aucune commission
            </li>
          </ul>
          <div className="text-base text-blue-100 font-medium">Votre inscription ne prend que 2 minutes !</div>
          <div className="mt-10 text-sm text-blue-100 opacity-70">© {new Date().getFullYear()} MedReplace</div>
        </div>
      </div>

      {/* Right side: Registration form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8 lg:p-12">
        <div className="w-full max-w-4xl">
          {/* <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Créer un compte</h1>
            <p className="text-lg text-gray-600 mt-3">Rejoignez notre communauté de professionnels de santé</p>
          </div> */}
          <Card className="shadow-2xl rounded-3xl border border-blue-200 bg-gradient-to-br from-white to-blue-50">
            {/* <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-gray-900">Inscription</CardTitle>
            </CardHeader> */}
            <CardContent className="px-10 pb-10">
              <Tabs value={userType} onValueChange={(value: string) => setUserType(value as "replacement" | "employer")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger
                    value="replacement"
                    className="py-3 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
                  >
                    Médecin remplaçant
                  </TabsTrigger>
                  <TabsTrigger
                    value="employer"
                    className="py-3 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
                  >
                    Demandeur de remplacement
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="replacement" className="mt-6">
                  <ReplacementRegisterForm
                    formData={formData}
                    setFormData={setFormData}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    specialties={specialties}
                  />
                </TabsContent>

                <TabsContent value="employer" className="mt-6">
                  <EmployerRegisterForm
                    formData={formData}
                    setFormData={setFormData}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    companyTypes={companyTypes}
                  />
                </TabsContent>
              </Tabs>
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-600">
                  Déjà un compte ?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}