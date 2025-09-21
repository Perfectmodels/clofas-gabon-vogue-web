import { ReactNode, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminAuth from './AdminAuth';

interface AdminProtectionProps {
  children: ReactNode;
}

const AdminProtection = ({ children }: AdminProtectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = () => {
      const authStatus = localStorage.getItem('clofas_admin_auth');
      const isValid = authStatus === 'true';
      setIsAuthenticated(isValid);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    localStorage.removeItem('clofas_admin_auth');
    localStorage.removeItem('clofas_admin_user');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clofas-coral"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="relative">
      {/* Bouton de déconnexion */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
        >
          <Lock className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
      
      {children}
    </div>
  );
};

export default AdminProtection;
