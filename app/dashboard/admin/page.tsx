"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  Calendar,
  MapPin,
  Mail,
  Download,
  MessageSquare,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedMission, setSelectedMission] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data
  const stats = {
    totalUsers: 1247,
    pendingValidations: 23,
    activeMissions: 156,
    completedMissions: 892,
    totalRevenue: 125000,
  }

  const pendingUsers = [
    {
      id: 1,
      name: "Dr. Marie Dubois",
      email: "marie.dubois@email.com",
      type: "Médecin remplaçant",
      specialty: "Médecine générale",
      location: "Paris",
      registrationDate: "2024-01-15",
      status: "pending",
      documents: ["RPPS", "Diplôme", "CV"],
    },
    {
      id: 2,
      name: "Clinique Saint-Antoine",
      email: "contact@clinique-sa.fr",
      type: "Établissement",
      location: "Lyon",
      registrationDate: "2024-01-14",
      status: "pending",
      documents: ["SIRET", "Autorisation"],
    },
  ]

  const missions = [
    {
      id: 1,
      title: "Remplacement Médecin Généraliste",
      employer: "Cabinet Médical Central",
      location: "Marseille",
      dates: "15-20 Jan 2024",
      salary: "400€/jour",
      status: "active",
      applicants: 5,
      publishedDate: "2024-01-10",
    },
    {
      id: 2,
      title: "Urgentiste - Garde de nuit",
      employer: "Hôpital Général",
      location: "Toulouse",
      dates: "22-25 Jan 2024",
      salary: "500€/garde",
      status: "pending",
      applicants: 2,
      publishedDate: "2024-01-12",
    },
  ]

  const handleValidateUser = (userId, action) => {
    console.log(`${action} user ${userId}`)
  }

  const handleValidateMission = (missionId, action) => {
    console.log(`${action} mission ${missionId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Administration</h1>
          <p className="text-indigo-100">Gestion de la plateforme MedReplace</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs totaux</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingValidations}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Missions actives</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeMissions}</p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Missions terminées</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.completedMissions}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenus totaux</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.totalRevenue.toLocaleString()}€</p>
                </div>
                <BarChart3 className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Gestion Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Supervision Missions
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Validation Documents
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Analyses
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-blue-800">Recherche et Filtres</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="search">Rechercher un utilisateur</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Nom, email, spécialité..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filter">Statut</Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48 focus:ring-2 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="approved">Approuvés</SelectItem>
                          <SelectItem value="rejected">Rejetés</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Users */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardTitle className="text-orange-800">Utilisateurs en attente de validation</CardTitle>
                  <CardDescription>Profils nécessitant une validation manuelle</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {pendingUsers.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <Badge variant={user.type === "Médecin remplaçant" ? "default" : "secondary"}>
                                {user.type}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {user.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {user.location}
                              </div>
                              {user.specialty && (
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  {user.specialty}
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Inscrit le {user.registrationDate}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {user.documents.map((doc) => (
                                <Badge key={doc} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleValidateUser(user.id, "approve")}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <UserCheck className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleValidateUser(user.id, "reject")}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Missions Management */}
          <TabsContent value="missions">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="text-green-800">Supervision des missions</CardTitle>
                <CardDescription>Modération et gestion des offres de remplacement</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{mission.title}</h3>
                            <Badge variant={mission.status === "active" ? "default" : "secondary"}>
                              {mission.status === "active" ? "Active" : "En attente"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {mission.employer}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {mission.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {mission.dates}
                            </div>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              {mission.salary}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-blue-600 font-medium">{mission.applicants} candidatures</span>
                            <span className="text-gray-500">Publié le {mission.publishedDate}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedMission(mission)}
                            className="hover:bg-green-50 hover:border-green-300"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Détails
                          </Button>
                          {mission.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleValidateMission(mission.id, "approve")}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approuver
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleValidateMission(mission.id, "reject")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeter
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Validation */}
          <TabsContent value="documents">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="text-purple-800">Validation des documents</CardTitle>
                <CardDescription>Vérification des pièces justificatives</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["RPPS en attente", "Diplômes à vérifier", "Contrats à valider"].map((category, index) => (
                    <Card key={category} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-700">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600 mb-2">{[12, 8, 5][index]}</div>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Traiter
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardTitle className="text-orange-800">Statistiques d'utilisation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Nouvelles inscriptions (30j)</span>
                      <span className="font-bold text-orange-600">+47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Missions publiées (30j)</span>
                      <span className="font-bold text-orange-600">+123</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Taux de matching</span>
                      <span className="font-bold text-orange-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Satisfaction moyenne</span>
                      <span className="font-bold text-orange-600">4.6/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                  <CardTitle className="text-indigo-800">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-indigo-500 hover:bg-indigo-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Envoyer notification globale
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter données utilisateurs
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Générer rapport mensuel
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Configurer filtres automatiques
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
