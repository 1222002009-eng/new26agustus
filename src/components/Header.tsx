"use client"
import { useApp } from "../context/AppContext"
import { LogOut, Shield } from "lucide-react"

export function Header() {
  const { state, dispatch } = useApp()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <header className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-xl border-b-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-heading">Sistem Tracking Pesan & Workflow</h1>
              <p className="text-amber-100 font-medium">Kementerian Lingkungan Hidup Republik Indonesia</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-lg font-semibold text-white">{state.currentUser?.name}</p>
              <p className="text-amber-100 font-medium">{state.currentUser?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
