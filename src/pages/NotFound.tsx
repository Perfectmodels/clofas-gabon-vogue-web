import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-clofas-dark to-gray-800 text-white">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-playfair text-8xl md:text-9xl font-bold text-clofas-coral mb-4 animate-fade-in">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Page introuvable
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            asChild
            className="btn-primary hover:scale-105 transition-transform duration-300"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-clofas-dark transition-all duration-300"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Page précédente
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p>Si vous pensez qu'il s'agit d'une erreur, contactez-nous :</p>
          <a 
            href="https://wa.me/24177507950" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-clofas-coral hover:underline"
          >
            +241 77 50 79 50
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
