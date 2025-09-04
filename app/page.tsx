'use client'; // Important! Forces client-side rendering

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Users,
  Calendar,
  MapPin,
  Shield,
  Clock,
  Star,
  Stethoscope,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react"

export default function HomePage() {
  // Clear any existing auth data when landing page loads
  if (typeof window !== 'undefined') {
    // Clear localStorage
    localStorage.removeItem('mock-auth')
    
    // Clear auth-token cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
   <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src="logo.png"
            alt="Logo Le Foyer Médical"
            className="w-12 h-12 rounded-full shadow-md border border-white"
          />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
            Le Foyer Médical
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Fonctionnalités
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Comment ça marche
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Témoignages
          </Link>
        </nav>

        {/* Buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-medium">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
              S'inscrire
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col items-start gap-4 p-4">
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Témoignages
            </Link>
            <hr className="w-full border-gray-200 my-2" />
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full text-left">
                Connexion
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                S'inscrire
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 md:pb-28 pt-10">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-300 rounded-full blur-3xl opacity-30" />

        <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 gap-12">
          {/* Left content */}
          <div className="max-w-2xl text-center md:text-left space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-semibold">
              <Stethoscope className="w-5 h-5" />
              <span>Votre santé, toujours assurée</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              Trouvez un <span className="text-blue-600">médecin remplaçant</span> en un clic
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Gagnez du temps et restez serein : notre plateforme connecte instantanément
              médecins titulaires et remplaçants partout au Maroc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 flex items-center gap-2 shadow-md"
              >
                <Users className="w-5 h-5" /> Trouver un remplaçant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 flex items-center gap-2 border-2"
              >
                Proposer mes services <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="hero.png"
                alt="Doctor replacement illustration"
                className="drop-shadow-2xl rounded-3xl border-4 border-white w-[90%] sm:w-[80%] md:w-full mx-auto"
              />
              {/* Floating card */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3 animate-bounce">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">+300 médecins</p>
                  <p className="text-xs text-gray-500">déjà inscrits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Fonctionnalités</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Une plateforme complète pour tous vos besoins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des outils puissants et intuitifs pour simplifier la gestion des remplacements médicaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Matching intelligent</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Algorithme de correspondance basé sur la spécialité, localisation et disponibilités pour des matches
                  parfaits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Profils vérifiés</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Validation rigoureuse des documents RPPS, diplômes et certifications par notre équipe d'experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Gestion simplifiée</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Planning intégré, gestion des contrats et facturation automatisée pour un workflow optimal
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Recherche géolocalisée</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Trouvez des missions ou des remplaçants près de chez vous avec notre système de géolocalisation avancé
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Réponse rapide</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Notifications en temps réel et système de réponse instantané pour ne jamais manquer une opportunité
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="medical-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3">Système d'évaluation</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Évaluations mutuelles transparentes pour maintenir la qualité du service et la confiance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
 <section id="how-it-works" className="py-20 md:py-28 bg-white">
  <div className="container mx-auto px-6 lg:px-12">
    {/* Section header */}
    <div className="text-center mb-16 md:mb-20">
      <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">
        Processus
      </Badge>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
        Comment ça marche ?
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        Un processus simple et efficace pour tous
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
      {/* Pour les remplaçants */}
      <div className="relative flex flex-col items-center lg:items-start">
        <div className="text-center lg:text-left mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-xl">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Pour les médecins remplaçants
          </h3>
        </div>

        <div className="space-y-8 w-full">
          {[
            {
              step: "1",
              title: "Créez votre profil",
              desc: "Renseignez vos spécialités, disponibilités et tarifs en quelques minutes",
            },
            {
              step: "2",
              title: "Uploadez vos documents",
              desc: "RPPS, diplômes et certifications pour validation rapide et sécurisée",
            },
            {
              step: "3",
              title: "Recevez des propositions",
              desc: "Acceptez ou refusez les missions qui correspondent à vos critères",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-6 items-start group transition-transform"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 w-full flex justify-center lg:justify-start">
          <img
            src="remp.png"
            alt="Médecin utilisant une tablette"
            className="w-full max-w-sm object-contain rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* Pour les établissements */}
      <div className="relative flex flex-col items-center lg:items-start">
        <div className="text-center lg:text-left mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Pour les établissements
          </h3>
        </div>

        <div className="space-y-8 w-full">
          {[
            {
              step: "1",
              title: "Publiez votre mission",
              desc: "Spécialité, dates, tarif et localisation en quelques clics",
            },
            {
              step: "2",
              title: "Consultez les profils",
              desc: "Parcourez les médecins correspondant parfaitement à vos critères",
            },
            {
              step: "3",
              title: "Trouvez votre remplaçant",
              desc: "Envoyez des propositions et gérez vos contrats facilement",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-6 items-start group transition-transform"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <div className="pt-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 w-full flex justify-center lg:justify-start">
          <img
            src="empl.png"
            alt="Établissement médical"
            className="w-full max-w-sm object-contain rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-green-100 text-green-700 border-0">Témoignages</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Ils nous font confiance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="medical-card border-0 shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/professional-female-doctor.png"
                  alt="Dr. Marie Dubois"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Dr. Marie Dubois</div>
                  <div className="text-sm text-gray-500">Médecin généraliste</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "MedReplace a révolutionné ma façon de trouver des missions. Interface intuitive et propositions
                parfaitement adaptées à mes critères."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>

            <Card className="medical-card border-0 shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/empl.png"
                  alt="Jean Martin"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Jean Martin</div>
                  <div className="text-sm text-gray-500">Directeur Clinique Saint-Louis</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "Nous trouvons des remplaçants qualifiés en quelques heures. La plateforme nous fait gagner un temps
                précieux."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>

            <Card className="medical-card border-0 shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/confident-male-doctor.png"
                  alt="Dr. Pierre Leroy"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900">Dr. Pierre Leroy</div>
                  <div className="text-sm text-gray-500">Cardiologue</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "Excellent système de matching. J'ai trouvé des missions parfaitement adaptées à ma spécialité et mes
                disponibilités."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6">Prêt à simplifier vos remplacements ?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des milliers de professionnels qui font confiance à MedReplace pour leurs remplacements médicaux
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent text-lg px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="logo.png"
              alt="Logo Le Foyer Médical"
              className="w-12 h-12 rounded-full shadow-md border border-white"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
              Le Foyer Médical
            </h1>
          </div>
          <p className="text-gray-400 leading-relaxed mb-2 max-w-md">
            Plateforme de référence pour les remplacements médicaux en France et au Maroc.
          </p>
          <p className="text-gray-400 mb-2 text-sm">
            Contact : <a href="mailto:contact@medreplace.com" className="underline hover:text-blue-300">contact@medreplace.com</a>
          </p>
          <p className="text-gray-500 text-xs">&copy; 2024 MedReplace. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
