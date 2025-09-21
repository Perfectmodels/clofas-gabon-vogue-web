import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const AdminAuth = ({ onLogin }: AdminAuthProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Credentials par défaut pour l'accès admin
  const ADMIN_CREDENTIALS = {
    username: 'admin@clofas241.ga',
    password: 'Clofas241Admin2024!'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'une vérification d'authentification
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        // Stocker l'état d'authentification dans localStorage
        localStorage.setItem('clofas_admin_auth', 'true');
        localStorage.setItem('clofas_admin_user', JSON.stringify({
          firstName: 'Admin',
          lastName: 'CLOFAS',
          email: credentials.username
        }));
        
        onLogin(true);
        navigate('/admin');
      } else {
        setError('Identifiants incorrects. Veuillez vérifier vos informations.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-clofas-dark to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-clofas-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-clofas-coral" />
          </div>
          <CardTitle className="text-2xl font-bold text-clofas-dark">
            Connexion Administrateur
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Accès au panel d'administration CLOFAS 241
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                name="username"
                type="email"
                value={credentials.username}
                onChange={handleChange}
                placeholder="admin@clofas241.ga"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Se connecter
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">
              🔑 Identifiants de Connexion
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> admin@clofas241.ga</p>
              <p><strong>Mot de passe:</strong> Clofas241Admin2024!</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Retour au site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
