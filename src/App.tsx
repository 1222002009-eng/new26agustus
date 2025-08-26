import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { PublicTracking } from './components/PublicTracking';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { TUDashboard } from './components/dashboards/TUDashboard';
import { CoordinatorDashboard } from './components/dashboards/CoordinatorDashboard';
import { StaffDashboard } from './components/dashboards/StaffDashboard';
import { Search, Home, Users, FileText, Clipboard, CheckSquare } from 'lucide-react';

function App() {
  const { state } = useApp();
  const [showPublicTracking, setShowPublicTracking] = useState(false);

  if (!state.isAuthenticated && !showPublicTracking) {
    return (
      <div>
        <div className="fixed top-4 right-4">
          <button
            onClick={() => setShowPublicTracking(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            <Search className="w-4 h-4" />
            Lacak Surat
          </button>
        </div>
        <Login />
      </div>
    );
  }

  if (showPublicTracking) {
    return (
      <div>
        <div className="fixed top-4 left-4">
          <button
            onClick={() => setShowPublicTracking(false)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            Kembali ke Login
          </button>
        </div>
        <PublicTracking />
      </div>
    );
  }

  const getDashboardComponent = () => {
    switch (state.currentUser?.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'TU':
        return <TUDashboard />;
      case 'Koordinator':
        return <CoordinatorDashboard />;
      case 'Staff':
        return <StaffDashboard />;
      default:
        return <div>Role tidak dikenal</div>;
    }
  };

  const getDashboardIcon = () => {
    switch (state.currentUser?.role) {
      case 'Admin':
        return Users;
      case 'TU':
        return FileText;
      case 'Koordinator':
        return Clipboard;
      case 'Staff':
        return CheckSquare;
      default:
        return Home;
    }
  };

  const Icon = getDashboardIcon();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto">
        {getDashboardComponent()}
      </main>
      
      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowPublicTracking(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <Search className="w-4 h-4" />
          Lacak Surat Publik
        </button>
      </div>
    </div>
  );
}

export default App;
