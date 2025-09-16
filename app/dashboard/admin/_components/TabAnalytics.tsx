"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MessageSquare, Download, BarChart3, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

interface TabAnalyticsProps {}

export default function TabAnalytics({}: TabAnalyticsProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-orange-50/60 shadow rounded-2xl border-0">
        <CardHeader className="bg-transparent pb-2">
          <CardTitle className="text-orange-800 font-bold">Statistiques d'utilisation</CardTitle>
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
      <Card className="bg-indigo-50/60 shadow rounded-2xl border-0">
        <CardHeader className="bg-transparent pb-2">
          <CardTitle className="text-indigo-800 font-bold">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Button className="w-full justify-start bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
              <MessageSquare className="h-4 w-4 mr-2" />
              Envoyer notification globale
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Exporter données utilisateurs
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent rounded-xl">
              <BarChart3 className="h-4 w-4 mr-2" />
              Générer rapport mensuel
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-indigo-50 bg-transparent rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Configurer filtres automatiques
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
