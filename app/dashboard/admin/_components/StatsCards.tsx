"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Users, AlertTriangle, FileText, CheckCircle, BarChart3 } from "lucide-react"
import React from "react"

interface StatsCardsProps {
  stats: {
    totalUsers: number;
    pendingValidations: number;
    activeMissions: number;
    completedMissions: number;
    totalRevenue: number;
  }
  show: boolean
}

export default function StatsCards({ stats, show }: StatsCardsProps) {
  if (!show) return null
  return (
    <div className="p-6 pb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {[{
          label: 'Utilisateurs totaux',
          value: stats.totalUsers,
          color: 'text-blue-700',
          icon: <Users className="h-10 w-10 text-blue-400" />
        }, {
          label: 'En attente',
          value: stats.pendingValidations,
          color: 'text-orange-600',
          icon: <AlertTriangle className="h-10 w-10 text-orange-400" />
        }, {
          label: 'Missions actives',
          value: stats.activeMissions,
          color: 'text-green-600',
          icon: <FileText className="h-10 w-10 text-green-400" />
        }, {
          label: 'Missions terminées',
          value: stats.completedMissions,
          color: 'text-purple-600',
          icon: <CheckCircle className="h-10 w-10 text-purple-400" />
        }, {
          label: 'Revenus totaux',
          value: stats.totalRevenue.toLocaleString() + '€',
          color: 'text-emerald-600',
          icon: <BarChart3 className="h-10 w-10 text-emerald-400" />
        }].map((stat) => (
          <Card key={stat.label} className="bg-white/90 shadow-xl rounded-2xl border-0 group hover:scale-105 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-6 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{stat.label}</p>
                  <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
