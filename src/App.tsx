"use client"

import { useState } from "react"
import { useApp } from "./context/AppContext"
import { Login } from "./components/Login"
import { Header } from "./components/Header"
import { PublicTracking } from "./components/PublicTracking"
import { AdminDashboard } from "./components/dashboards/AdminDashboard"
import { TUDashboard } from "./components/dashboards/TUDashboard"
import { CoordinatorDashboard } from "./components/dashboards/CoordinatorDashboard"
import { StaffDashboard } from "./components/dashboards/StaffDashboard"
import { Search, Home, Users, FileText, Clipboard, CheckSquare } from "lucide-react"

function App() {
  const { state } = useApp()
  const [showPublicTracking, setShowPublicTracking] = useState(false)

  if (!state.isAuthenticated && !showPublicTracking) {
    return (
      <div>
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setShowPublicTracking(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg font-medium"
          >
            <Search className="w-5 h-5" />
            Lacak Surat Publik
          </button>
        </div>
        <Login />
      </div>
    )
  }

  if (showPublicTracking) {
    return (
      <div>
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={() => setShowPublicTracking(false)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg font-medium"
          >
            <Home className="w-5 h-5" />
            Kembali ke Login
          </button>
        </div>
        <PublicTracking />
      </div>
    )
  }

  const getDashboardComponent = () => {
    switch (state.currentUser?.role) {
      case "Admin":
        return <AdminDashboard />
      case "TU":
        return <TUDashboard />
      case "Koordinator":
        return <CoordinatorDashboard />
      case "Staff":
        return <StaffDashboard />
      default:
        return <div>Role tidak dikenal</div>
    }
  }

  const getDashboardIcon = () => {
    switch (state.currentUser?.role) {
      case "Admin":
        return Users
      case "TU":
        return FileText
      case "Koordinator":
        return Clipboard
      case "Staff":
        return CheckSquare
      default:
        return Home
    }
  }

  const Icon = getDashboardIcon()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8">{getDashboardComponent()}</main>

      {/* Navigation hint */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setShowPublicTracking(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg font-medium"
        >
          <Search className="w-5 h-5" />
          Lacak Surat Publik
        </button>
      </div>
    </div>
  )
}

export default App
