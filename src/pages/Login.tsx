import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-clofas-dark to-gray-800">
      <div className="w-full max-w-md mx-4">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-clofas-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-clofas-coral" />
            </div>
            <CardTitle className="text-2xl font-bold text-clofas-dark">
              Connexion CLOFAS 241
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Accédez à l'administration de votre site
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-clofas-coral mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-clofas-dark mb-2">
                  Système d'Authentification Simplifié
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Utilisez vos identifiants administrateur pour accéder au panel.
                </p>
                <Button 
                  onClick={() => navigate('/admin-login')}
                  className="w-full bg-clofas-coral hover:bg-clofas-coral/90 mb-4"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Se Connecter
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Créer un Compte
                </Button>
              </div>
              
              <div className="text-center pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
