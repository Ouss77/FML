"use client"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

interface TabDocumentsProps {}

export default function TabDocuments({}: TabDocumentsProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-purple-50/60 shadow rounded-2xl border-0">
        <CardHeader className="bg-transparent pb-2">
          <CardTitle className="text-purple-800 font-bold">Validation des documents</CardTitle>
          <CardDescription>Vérification des pièces justificatives</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["RPPS en attente", "Diplômes à vérifier", "Contrats à valider"].map((category, index) => (
              <Card key={category} className="hover:shadow-lg transition-shadow bg-white/80 rounded-xl border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{[12, 8, 5][index]}</div>
                  <Button size="sm" variant="outline" className="w-full bg-transparent rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Traiter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
