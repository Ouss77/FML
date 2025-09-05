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
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",  password: "",
    confirmPassword: "", acceptTerms: false, specialty: "", location: "",
    availability: "", companyName: "", companyType: "", siret: "", description: "",
  });
  const router = useRouter();

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg animate-in zoom-in-95 duration-300">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Inscription réussie !</h3>
            <p className="text-gray-600 mb-4">
              Votre compte {userType === "replacement" ? "médecin remplaçant" : "établissement"} est prêt.
            </p>
            <p className="text-sm text-gray-500">Redirection en cours...</p>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Left side: Logo Section */}
        <div className="lg:w-2/5 bg-gradient-to-b from-blue-200 to-blue-300 text-white flex flex-col items-center p-0 relative top-0">
          <div className="flex flex-col items-center w-full h-full pt-6 pb-2">
          <img
            src="/logo.png"
            alt="MedReplace Logo"
            className="w-72 h-72 rounded-full shadow-lg mb-4 border-4 border-white bg-white object-contain"
          />
          <h2 className="text-2xl font-semibold mb-1 text-blue-100">Rejoignez MedReplace</h2>
          <ul className="space-y-2 text-left text-base max-w-xs mx-auto">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-200 rounded-full"></span>
              Connexion rapide et sécurisée
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-200 rounded-full"></span>
              Conçu pour les professionnels de santé
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-200 rounded-full"></span>
              Sans frais ni commissions
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-100">Inscription en moins de 2 minutes !</p>
          <p className="mt-2 text-xs text-blue-100 opacity-70">© {new Date().getFullYear()} MedReplace</p>
        </div>
      </div>

      {/* Right side: Registration Form */}
      <div className="lg:w-2/5 w-full mx-auto flex flex-col p-10 m-0 ">
          <CardContent className="p-0">
            <Tabs value={userType} onValueChange={(value: string) => setUserType(value as 'replacement' | 'employer')}>
              <TabsList className="flex w-full mx-auto justify-center bg-gray-100 border border-blue-200 shadow  p-10 mb-8 gap-0 overflow-hidden rounded-2xl">
                <TabsTrigger
                  value="replacement"
                  className="flex-1 p-10 text-2xl font-semibold border-r border-blue-200 last:border-r-0 transition-all duration-200
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:scale-105 data-[state=active]:shadow-md
                    data-[state=inactive]:bg-white data-[state=inactive]:text-blue-700 hover:data-[state=inactive]:bg-blue-50
                    rounded-none focus:outline-none"
                >
                  Médecin remplaçant
                </TabsTrigger>
                <TabsTrigger
                  value="employer"
                  className="flex-1 w-full p-10 text-xl font-semibold transition-all duration-200
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:scale-105 data-[state=active]:shadow-md
                    data-[state=inactive]:bg-white data-[state=inactive]:text-blue-700 hover:data-[state=inactive]:bg-blue-50
                    rounded-none focus:outline-none"
                >
                  Demandeur
                </TabsTrigger>
              </TabsList>

              <TabsContent value="replacement">
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

              <TabsContent value="employer">
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
              <p className="text-base text-gray-600">
                Déjà inscrit ?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
      </div>
    </div>
  );
}
