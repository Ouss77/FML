"use client"
import { Button } from "@/components/ui/button"
import DocumentsSection from "./components/DocumentsSection"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Bell, Home, Briefcase, Mail, Calendar, User, FileText, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { CheckCircle, Clock, Star, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import ProfileSection from "./components/ProfileSection"
import RatesSection from "./components/RatesSection"
import ExperienceSection from "./components/ExperienceSection"
import ProposalsSection from "./components/ProposalsSection"
import AvailableMissionsSection from "./components/AvailableMissionsSection"
import MyMissionsSection from "./components/MyMissionsSection"

export default function ReplacementDashboard() {
  const { user, profile, loading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isEditRatesOpen, setIsEditRatesOpen] = useState(false)
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    location: "",
    hourlyRate: "",
    dailyRate: "",
    availability: "",
  })

  useEffect(() => {
    console.log("User:", user)
    console.log("Profile:", profile)
    if (user && profile) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        specialty: profile.specialty || "",
        location: profile.location || "",
        hourlyRate: profile.hourlyRate?.toString() || "",
        dailyRate: profile.dailyRate?.toString() || "",
        availability: profile.availability || "",
      })
    }
  }, [user, profile])

  const [newExperience, setNewExperience] = useState({
    workplace: "",
    location: "",
    duration: "",
    period: "",
    specialty: "",
    reference: "",
    rating: "",
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          profileData: {
            specialty: profileData.specialty,
            location: profileData.location,
            // Add other fields as needed
          },
        }),
      })
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde du profil")
      // Optionally, refetch user/profile here
      setIsEditProfileOpen(false)
    } catch (err) {
      alert("Erreur lors de la sauvegarde du profil")
    }
  }

  const handleSaveRates = () => {
    // Save rates logic here
    setIsEditRatesOpen(false)
  }

  const handleProposalResponse = (id: number, response: "accept" | "decline") => {
    console.log(`Proposition ${id} ${response}`)
    // Ici on gérerait la réponse à la proposition
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
  ]

  const pendingProposals = [
    {
      id: 1,
      hospital: "CHU de Lyon",
      specialty: "Cardiologie",
      location: "Lyon, Rhône",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      dailyRate: 450,
      description: "Remplacement en service de cardiologie interventionnelle",
      urgency: "high",
    },
    {
      id: 2,
      hospital: "Clinique Saint-Jean",
      specialty: "Médecine générale",
      location: "Marseille, Bouches-du-Rhône",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      dailyRate: 380,
      description: "Remplacement weekend en médecine générale",
      urgency: "medium",
    },
    {
      id: 3,
      hospital: "Hôpital Privé de Provence",
      specialty: "Cardiologie",
      location: "Aix-en-Provence, Bouches-du-Rhône",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      dailyRate: 500,
      description: "Remplacement longue durée en cardiologie",
      urgency: "normal",
    },
  ]

  const availableMissions = [
    {
      id: 3,
      hospital: "Hôpital Privé de Provence",
      specialty: "Cardiologie",
      location: "Aix-en-Provence, Bouches-du-Rhône",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      dailyRate: 500,
      description: "Remplacement longue durée en cardiologie",
      postedDate: "2024-01-20",
      applicants: 3,
    },
    {
      id: 4,
      hospital: "Centre Hospitalier de Grenoble",
      specialty: "Cardiologie",
      location: "Grenoble, Isère",
      startDate: "2024-02-25",
      endDate: "2024-02-28",
      dailyRate: 420,
      description: "Remplacement urgences cardiologiques",
      postedDate: "2024-01-18",
      applicants: 1,
    },
  ] 

  const myMissions = [
    {
      id: 5,
      hospital: "Clinique du Parc",
      specialty: "Cardiologie",
      location: "Nice, Alpes-Maritimes",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      dailyRate: 480,
      status: "completed",
      rating: 5,
    },
    {
      id: 6,
      hospital: "Hôpital Saint-Antoine",
      specialty: "Cardiologie",
      location: "Paris, Île-de-France",
      startDate: "2024-02-05",
      endDate: "2024-02-08",
      dailyRate: 520,
      status: "confirmed",
    },
  ] 

  const sidebarItems = [
    { id: "overview", label: "Vue d'ensemble", icon: Home, badge: null },
    { id: "missions", label: "Missions disponibles", icon: Briefcase, badge: availableMissions.length },
    { id: "proposals", label: "Propositions reçues", icon: Mail, badge: pendingProposals.length },
    { id: "my-missions", label: "Mes missions", icon: Calendar, badge: null },
    { id: "profile", label: "Mon profil", icon: User, badge: null },
    { id: "documents", label: "Documents", icon: FileText, badge: null },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette page.</p>
          <Button onClick={() => (window.location.href = "/login")} className="bg-blue-600 hover:bg-blue-700">
            Se connecter
          </Button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Missions terminées</p>
                      <p className="text-3xl font-bold text-green-900">12</p>
                    </div>
                    <div className="p-3 bg-green-500 rounded-full">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Propositions en attente</p>
                      <p className="text-3xl font-bold text-orange-900">3</p>
                    </div>
                    <div className="p-3 bg-orange-500 rounded-full">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Note moyenne</p>
                      <p className="text-3xl font-bold text-yellow-900">4.9</p>
                    </div>
                    <div className="p-3 bg-yellow-500 rounded-full">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Revenus ce mois</p>
                      <p className="text-3xl font-bold text-blue-900">3,240€</p>
                    </div>
                    <div className="p-3 bg-blue-500 rounded-full">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ProfileSection
                  profileData={profileData}
                  setProfileData={setProfileData}
                  isEditProfileOpen={isEditProfileOpen}
                  setIsEditProfileOpen={setIsEditProfileOpen}
                  handleSaveProfile={handleSaveProfile}
                />
              </div>
              <div className="md:col-span-1">
                <RatesSection
                  profileData={profileData}
                  setProfileData={setProfileData}
                  isEditRatesOpen={isEditRatesOpen}
                  setIsEditRatesOpen={setIsEditRatesOpen}
                  handleSaveRates={handleSaveRates}
                />
              </div>
            </div>
          </>
        )
      case "missions":
        return <AvailableMissionsSection availableMissions={availableMissions} />
      case "proposals":
        return (
          <ProposalsSection
            pendingProposals={pendingProposals}
            handleProposalResponse={handleProposalResponse}
            getUrgencyColor={getUrgencyColor}
          />
        )
      case "my-missions":
        return <MyMissionsSection myMissions={myMissions} getStatusColor={getStatusColor} />
      case "profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ProfileSection
                profileData={profileData}
                setProfileData={setProfileData}
                isEditProfileOpen={isEditProfileOpen}
                setIsEditProfileOpen={setIsEditProfileOpen}
                handleSaveProfile={handleSaveProfile}
              />
            </div>
            <div className="md:col-span-1">
              <RatesSection
                profileData={profileData}
                setProfileData={setProfileData}
                isEditRatesOpen={isEditRatesOpen}
                setIsEditRatesOpen={setIsEditRatesOpen}
                handleSaveRates={handleSaveRates}
              />
            </div>
          </div>
        )
      case "documents":
        return <DocumentsSection />
      default:
        return null
    }
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} h-screen bg-white shadow-xl transition-all duration-300 ease-in-out border-r border-gray-100 flex flex-col fixed left-0 top-0`}>
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MedReplace
                </h1>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {sidebarCollapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <Avatar className="ring-2 ring-white shadow-md">
                  <img
                    src={profile?.photoUrl || "/placeholder-user.jpg"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{profileData.specialty}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Avatar className="ring-2 ring-white shadow-md">
                  <img
                    src={profile?.photoUrl || "/placeholder-user.jpg"}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </Avatar>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 min-h-screen ${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-6 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-gray-600 mt-1">
                  Bienvenue, {profileData.firstName} {profileData.lastName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                  <Bell className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                  <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}