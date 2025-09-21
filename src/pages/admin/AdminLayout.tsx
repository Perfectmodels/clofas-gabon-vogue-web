import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Image, 
  Settings, 
  FileText, 
  Calendar,
  Mail,
  BarChart3,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Gestion de l'utilisateur admin local
const useAdminUser = () => {
  const [user, setUser] = useState({ firstName: 'Admin', lastName: 'CLOFAS' });
  
  useEffect(() => {
    const storedUser = localStorage.getItem('clofas_admin_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  return { user };
};

import AdminProtection from '@/components/AdminProtection';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAdminUser();

  const adminNavItems = [
    { name: 'Tableau de bord', path: '/admin', icon: LayoutDashboard },
    { name: 'Inscriptions', path: '/admin/registrations', icon: Users, badge: '12' },
    { name: 'Créateurs', path: '/admin/creators', icon: Users },
    { name: 'Contenu', path: '/admin/content', icon: FileText },
    { name: 'Galerie', path: '/admin/gallery', icon: Image },
    { name: 'Événements', path: '/admin/events', icon: Calendar },
    { name: 'Messages', path: '/admin/messages', icon: Mail, badge: '3' },
    { name: 'Analytiques', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/');
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-clofas-coral" />
            <span className="ml-2 text-xl font-bold text-clofas-dark">Admin CLOFAS</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {adminNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-clofas-coral text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-clofas-gold text-white">
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full flex items-center justify-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Connecté en tant que <span className="font-semibold text-clofas-coral">{user?.firstName || 'Administrateur'}</span>
              </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-clofas-coral rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user?.firstName?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {user?.firstName || 'Admin'}
                    </span>
                  </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      </div>
    </AdminProtection>
  );
};

export default AdminLayout;
