"use client"
import { Users, Building2, Briefcase, UserCheck, Settings, Bell, LogOut, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import StatsCards from "./components/StatsCards"
import MissionsList from "./components/MissionsList"
import DoctorsList from "./components/DoctorsList"
import ProfileTabs from "./components/ProfileTabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("missions")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showCreateMission, setShowCreateMission] = useState(false)

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


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "filled":
        return "bg-blue-100 text-blue-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "filled":
        return "Pourvue"
      case "draft":
        return "Brouillon"
      case "expired":
        return "Expirée"
      default:
        return status
    }
  }

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
        return <MissionsList getStatusColor={getStatusColor} getStatusText={getStatusText} setShowCreateMission={setShowCreateMission} />
      case "doctors": 
        return <DoctorsList />
      case "applications":
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-xl text-gray-900">Candidatures reçues</CardTitle>
              <CardDescription>Gérez les candidatures pour vos missions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-gray-500">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune candidature en attente</h3>
                <p className="text-gray-500 mb-1">Les candidatures apparaîtront ici une fois que vous aurez publié des missions</p>
                <p className="text-sm text-gray-400">Créez votre première mission pour commencer à recevoir des candidatures</p>
              </div>
            </CardContent>
          </Card>
        )
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MedReplace
                  </h1>
                  <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 text-xs">
                    {profileData.establishmentName}
                  </Badge>
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
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                    {profileData.firstName?.[0]}{profileData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{profileData.position}</p>
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
                  {profileData.establishmentName} • {profileData.position}
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
              <StatsCards />
            </div>
          )}

          {/* Page Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Modal création mission */}
      {showCreateMission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Créer une nouvelle mission
              </CardTitle>
              <CardDescription className="text-blue-100">Publiez une offre de remplacement médical</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="space-y-2">
                <Label htmlFor="mission-title" className="text-sm font-medium text-gray-700">
                  Titre de la mission *
                </Label>
                <Input
                  id="mission-title"
                  placeholder="Ex: Remplacement Cardiologie"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                  Spécialité recherchée *
                </Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all">
                    <SelectValue placeholder="Sélectionnez une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="medecine-generale">Médecine générale</SelectItem>
                    <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                    <SelectItem value="psychiatrie">Psychiatrie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                    Date de début *
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                    Date de fin *
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-rate" className="text-sm font-medium text-gray-700">
                    Tarif journalier (€) *
                  </Label>
                  <Input
                    id="daily-rate"
                    type="number"
                    placeholder="450"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourly-rate" className="text-sm font-medium text-gray-700">
                    Tarif horaire (€)
                  </Label>
                  <Input
                    id="hourly-rate"
                    type="number"
                    placeholder="65"
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Localisation *
                </Label>
                <Input
                  id="location"
                  placeholder="Adresse ou ville"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description de la mission *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez la mission, les responsabilités, l'équipe..."
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-sm font-medium text-gray-700">
                  Exigences particulières
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="Expérience requise, certifications, équipements..."
                  rows={3}
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500/20 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateMission(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Annuler
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all"
                >
                  Sauvegarder en brouillon
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                  Publier la mission
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}