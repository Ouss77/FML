"use client"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import React from "react"

interface HeaderProps {
  activeTab: string;
  sidebarItems: { id: string; label: string; icon: any; badge: any }[];
}

export default function Header({ activeTab, sidebarItems }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {sidebarItems.find(item => item.id === activeTab)?.label}
          </h1>
          <p className="text-gray-600 mt-1">
            Espace d'administration de la plateforme
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
  )
}
