import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  ArrowLeft, 
  AlertCircle,
  CheckCircle,
  Home,
  Settings
} from 'lucide-react';

interface LoginCredentials {
  username: string;
  password: string;
}

const AdminLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Identifiants admin
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
        
        // Stocker l'état d'authentification
        localStorage.setItem('clofas_admin_auth', 'true');
        localStorage.setItem('clofas_admin_user', JSON.stringify({
          firstName: 'Admin',
          lastName: 'CLOFAS',
          email: credentials.username,
          loginTime: new Date().toISOString()
        }));
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans le panel d'administration CLOFAS 241",
        });

        navigate('/admin');
      } else {
        setError('Identifiants incorrects. Veuillez vérifier vos informations.');
        toast({
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  const fillCredentials = () => {
    setCredentials({
      username: ADMIN_CREDENTIALS.username,
      password: ADMIN_CREDENTIALS.password
    });
    setShowCredentials(false);
    toast({
      title: "Identifiants remplis",
      description: "Vous pouvez maintenant vous connecter",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-clofas-dark via-gray-800 to-gray-900 p-4">
      {/* Arrière-plan avec l'image de Beitch Faro */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
           style={{ backgroundImage: "url('/creators/beitch-faro/Beitch Faro (1).jpg')" }}></div>
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 bg-clofas-coral/20 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-clofas-coral" />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-clofas-dark">
                Panel Administrateur
              </CardTitle>
              <p className="text-gray-600 mt-2">
                CLOFAS 241 - Mode Gabonaise Authentique
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="admin@clofas241.ga"
                  required
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    required
                    className="w-full pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-clofas-coral hover:bg-clofas-coral/90 text-white"
                disabled={isLoading || !credentials.username || !credentials.password}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>
            </form>

            {/* Aide pour les identifiants */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowCredentials(!showCredentials)}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                {showCredentials ? 'Masquer les identifiants' : 'Voir les identifiants de test'}
              </Button>

              {showCredentials && (
                <Alert className="bg-blue-50 border-blue-200">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <div className="space-y-2">
                      <p className="font-semibold">Identifiants de test :</p>
                      <div className="text-sm space-y-1">
                        <p><strong>Email:</strong> admin@clofas241.ga</p>
                        <p><strong>Mot de passe:</strong> Clofas241Admin2024!</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={fillCredentials}
                      >
                        Remplir automatiquement
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Navigation */}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex-1"
                disabled={isLoading}
              >
                <Home className="h-4 w-4 mr-2" />
                Retour au site
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin')}
                className="flex-1"
                disabled={isLoading}
              >
                <Settings className="h-4 w-4 mr-2" />
                Panel Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informations sur le site */}
        <div className="mt-6 text-center text-white/80">
          <p className="text-sm">
            CLOFAS 241 - Consommation Locale Fashion Show
          </p>
          <p className="text-xs mt-1">
            Mode Gabonaise Authentique et Responsable
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
