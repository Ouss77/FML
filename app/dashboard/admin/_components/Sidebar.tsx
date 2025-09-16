"use client"
import { Users, FileText, CheckCircle, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import React from "react"

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarItems: { id: string; label: string; icon: any; badge: any }[];
}

export default function Sidebar({ sidebarCollapsed, setSidebarCollapsed, activeTab, setActiveTab, sidebarItems }: SidebarProps) {
  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} h-screen bg-white shadow-xl transition-all duration-300 ease-in-out border-r border-gray-100 flex flex-col fixed left-0 top-0`}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <img src="/placeholder-logo.png" alt="Logo" className="h-10 w-10 rounded-full shadow" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
              MedReplace
            </span>
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
                <span className="font-medium flex-1 text-left">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>
      {/* User Profile Section & Logout */}
      <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0 flex flex-col gap-3">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <img src="/placeholder-user.jpg" alt="Admin" className="h-10 w-10 rounded-full border-2 border-indigo-400 shadow" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@medreplace.com</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img src="/placeholder-user.jpg" alt="Admin" className="h-10 w-10 rounded-full border-2 border-indigo-400 shadow" />
          </div>
        )}
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
          }}
          className={`mt-2 w-full flex items-center justify-center gap-2 p-2 rounded-xl text-sm font-medium transition-colors duration-200 border border-gray-200 shadow-sm bg-white hover:bg-red-50 text-red-600 hover:text-red-800 ${sidebarCollapsed ? 'justify-center' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          {!sidebarCollapsed && 'Se déconnecter'}
        </button>
      </div>
    </div>
  )
}
