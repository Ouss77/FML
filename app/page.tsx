'use client'; // Important! Forces client-side rendering

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import Link from "next/link"

export default function HomePage() {
  // Clear any existing auth data when landing page loads
  if (typeof window !== 'undefined') {
    // Clear localStorage
    localStorage.removeItem('mock-auth')
    
    // Clear auth-token cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900">MedReplace</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Fonctionnalités
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Comment ça marche
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Témoignages
            </Link>
          </nav>
          <div className="flex items-center gap-3">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-animation"></div>
        <div
          className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200 border-0 px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Plateforme de confiance pour les professionnels de santé
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Trouvez votre{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  remplaçant médical
                </span>{" "}
                en quelques clics
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Connectez établissements de santé et médecins remplaçants grâce à notre système de matching intelligent.
                Simplifiez vos remplacements médicaux avec la technologie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/register?type=replacement">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl text-lg px-8 py-4"
                  >
                    Je cherche des missions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/register?type=employer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 text-lg px-8 py-4 bg-transparent"
                  >
                    Je cherche un remplaçant
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Inscription gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Profils vérifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/modern-doctor-stethoscope.png"
                  alt="Médecin professionnel avec stéthoscope"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 floating-animation">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">2,500+</div>
                      <div className="text-sm text-gray-500">Médecins</div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 floating-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">4.8/5</div>
                      <div className="text-sm text-gray-500">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                2,500+
              </div>
              <div className="text-blue-100 font-medium">Médecins inscrits</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">850+</div>
              <div className="text-blue-100 font-medium">Établissements partenaires</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                15,000+
              </div>
              <div className="text-blue-100 font-medium">Missions réalisées</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                4.8/5
              </div>
              <div className="text-blue-100 font-medium">Satisfaction moyenne</div>
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
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">Processus</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Un processus simple et efficace pour tous</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Pour les remplaçants */}
            <div className="relative">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900">Pour les médecins remplaçants</h3>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Créez votre profil</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Renseignez vos spécialités, disponibilités et tarifs en quelques minutes
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Uploadez vos documents</h4>
                    <p className="text-gray-600 leading-relaxed">
                      RPPS, diplômes et certifications pour validation rapide et sécurisée
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Recevez des propositions</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Acceptez ou refusez les missions qui correspondent à vos critères
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <img
                  src="/placeholder-srdqb.png"
                  alt="Médecin utilisant une tablette"
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Pour les demandeurs */}
            <div className="relative">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900">Pour les établissements</h3>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Publiez votre mission</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Spécialité, dates, tarif et localisation en quelques clics
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Consultez les profils</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Parcourez les médecins correspondant parfaitement à vos critères
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Trouvez votre remplaçant</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Envoyez des propositions et gérez vos contrats facilement
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <img
                  src="/placeholder-yf7el.png"
                  alt="Réception d'hôpital moderne"
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
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
                  src="/placeholder-j5w77.png"
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-serif font-bold">MedReplace</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                La plateforme de référence pour les remplacements médicaux en France. Connectons les professionnels de
                santé.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Produit</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Intégrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Statut
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Formation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Légal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 MedReplace. Tous droits réservés.</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>🇫🇷 Fait en France</span>
              <span>•</span>
              <span>Certifié HDS</span>
              <span>•</span>
              <span>RGPD Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
