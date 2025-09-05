"use client"
import { Users, Building2, Briefcase, UserCheck, Settings, Bell, LogOut, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import StatsCards from "./components/StatsCards"
import MissionsList from "./components/MissionsList"
import DoctorsList from "./components/DoctorsList"
import ProfileTabs from "./components/ProfileTabs"
import AddMissionModal from "./components/AddMissionModal"
import Candidature from "./components/Candidature"
import { useAuth } from "@/lib/auth"

export default function EmployerDashboard() {
  
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState("missions")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showCreateMission, setShowCreateMission] = useState(false)

  // Lifted state from MissionsList
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employerId, setEmployerId] = useState<string | null>(null);
    const [profileData, setProfileData] = useState({
    establishmentName: "CHU de Lyon",
    establishmentType: "hospital",
    address: "103 Grande Rue de la Croix-Rousse, 69004 Lyon",
    siret: "12345678901234",
    firstName: "Marie",
    lastName: "Dubois",
    position: "Responsable RH",
    email: "marie.dubois@chu-lyon.fr",
    phone: "+33 4 72 11 22 33",
    description:
      "Le CHU de Lyon est un établissement de référence dans la région Auvergne-Rhône-Alpes. Nous disposons de services de pointe en cardiologie, neurologie et chirurgie. Notre équipe dynamique recherche régulièrement des médecins remplaçants pour assurer la continuité des soins.",
  })


  // Fetch employerId from profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await res.json();
        setEmployerId(data.user?.id || null);
        setProfileData(data.profile || null);
      } catch (err) {
        setError("Impossible de charger le profil utilisateur");
      }
    }
    fetchProfile();
  }, []);

  // Fetch missions from DB
  useEffect(() => {
    if (!employerId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/missions?employerId=${employerId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setMissions(data.missions || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des missions");
        setLoading(false);
      });
  }, [employerId]);


  const pendingApplications = 7

  const sidebarItems = [
    { id: "missions", label: "Mes missions", icon: Briefcase, badge: null },
    { id: "doctors", label: "Médecins disponibles", icon: Users, badge: null },
    { id: "applications", label: "Candidatures", icon: UserCheck, badge: pendingApplications },
    { id: "profile", label: "Mon établissement", icon: Building2, badge: null },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "missions":
        return <MissionsList 
          setShowCreateMission={setShowCreateMission} 
          missions={missions}
          setMissions={setMissions}
          employerId={employerId}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      case "doctors": 
        return <DoctorsList />
      case "applications":
        return <Candidature missions={missions} />
      case "profile":
        return <ProfileTabs />
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
              <Link href="/" className="flex items-center gap-3">

        <div className="flex items-center gap-4">
          <img
            src="../logo.png"
            alt="Logo Le Foyer Médical"
            className="w-12 h-12 rounded-full shadow-md border border-white"
          />
          <h1 className="text-xl  font-bold bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
            Le Foyer Médical
          </h1>
        </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="flex-shrink-0">
            {!sidebarCollapsed && (
              <div className="p-4 border-b border-gray-100">
                <Button 
                  onClick={() => setShowCreateMission(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une mission
                </Button>
              </div>
            )}

            {sidebarCollapsed && (
              <div className="p-4 border-b border-gray-100 flex justify-center">
                <button
                  onClick={() => setShowCreateMission(true)}
                  className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl shadow-lg transition-all duration-200"
                  title="Créer une mission"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
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
                  <AvatarImage src={profileData.photo_url} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                   ouss
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {profileData.organization_name}  
                  </p>
                  <p className="text-xs text-gray-500 truncate">{profileData.organization_type}</p>
                </div>
                
                <button
                  className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Avatar className="ring-2 ring-white shadow-md">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                    {profileData.firstName?.[0]}{profileData.lastName?.[0]}
                  </AvatarFallback>
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
                  {profileData.establishmentName}  {profileData.position}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                  <Bell className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-0">
                    2
                  </Badge>
                </button>
              </div>
            </div>
          </header>

          {/* Stats Cards - Only show on missions tab */}
          {activeTab === 'missions' && (
            <div className="p-6 pb-0">
              {/* <StatsCards /> */}
            </div>
          )}

          {/* Page Content */}
          <div className="px-6">
            {renderContent()}
          </div>
        </div>
      </div>

  {/* Modal création mission */}
  <AddMissionModal 
    showForm={showCreateMission}
    setShowForm={setShowCreateMission}
    setMissions={setMissions}
    employerId={employerId}
    setLoading={setLoading}
    setError={setError}
  />
    </div>
  )
}
