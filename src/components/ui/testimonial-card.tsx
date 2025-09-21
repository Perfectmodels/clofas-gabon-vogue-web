import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  avatar, 
  rating = 5,
  className 
}: TestimonialCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-clofas-coral text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-clofas-dark">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
            {company && <p className="text-xs text-gray-500">{company}</p>}
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        
        <blockquote className="text-gray-700 italic">
          "{content}"
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
