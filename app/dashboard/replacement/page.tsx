"use client"
import { Button } from "@/components/ui/button"
import DocumentsSection from "./components/DocumentsSection"
import { Avatar } from "@/components/ui/avatar"
import { Bell, Home, Briefcase, Mail, Calendar, User, FileText, LogOut, ChevronLeft, ChevronRight, CheckCircle, Clock, DollarSign, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import ProfileSection from "./components/ProfileSection"
import ProposalsSection from "./components/ProposalsSection"
import AvailableMissionsSection from "./components/AvailableMissionsSection"
import MyMissionsSection from "./components/MyMissionsSection"
import DiplomasSection from "./components/DiplomasSection"

export default function ReplacementDashboard() {
  const { user, profile, loading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    userId: "",
    imageProfile: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    location: "",
    availability: "",
    
  })

  useEffect(() => { 
    if (user && profile) {
      setProfileData({
        userId: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        imageProfile: profile.photo_url || "",
        specialty: profile.specialty || "",
        location: profile.location || "",
        availability: profile.availability || ""
      })
    }
  }, [user, profile])

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
  ]

  const sidebarItems = [
    // { id: "overview", label: "Vue d'ensemble", icon: Home, badge: null },
    { id: "missions", label: "Missions disponibles", icon: Briefcase, badge: null },
    // { id: "proposals", label: "Propositions reçues", icon: Mail, badge: pendingProposals.length },
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

      case "missions":
        return <AvailableMissionsSection  />
      case "proposals":
        return (
          <ProposalsSection
            pendingProposals={pendingProposals}
            handleProposalResponse={handleProposalResponse}
            getUrgencyColor={getUrgencyColor}
          />
        )
      case "my-missions":
        return <MyMissionsSection />
      case "diplomas":
        return <DiplomasSection />
      case "profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-5  mt-0 pt-0">
            <div className="md:col-span-2">
              <ProfileSection
                profileData={profileData}
                setProfileData={setProfileData}
                isEditProfileOpen={isEditProfileOpen}
                setIsEditProfileOpen={setIsEditProfileOpen}
              />
            </div>
            <div className="md:col-span-3 flex flex-col gap-0 ">
              <div className="mt-0 mb-0 pt-0">
                <MyMissionsSection />
              </div>
              <div className="mt-[-20px] mb-0 pt-0">
                <DiplomasSection />
              </div>
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

        <div className="flex items-center gap-4">
          <img
            src="../logo.png"
            alt="Logo Le Foyer Médical"
            className="w-32 h-32 ml-10 rounded-full shadow-md border border-white"
          />
        </div>
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
                    src={profileData.imageProfile || "/placeholder-user.jpg"}    
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
                    src={ profileData.imageProfile}
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
          <div className="p-0 pt-0 mt-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}