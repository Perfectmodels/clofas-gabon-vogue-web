import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Award, 
  Mail, 
  Camera,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Download,
  Upload,
  Zap,
  Target,
  Globe,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MetricWidgetProps {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
  bgColor: string;
  description?: string;
  animated?: boolean;
}

const MetricWidget = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color, 
  bgColor, 
  description,
  animated = true 
}: MetricWidgetProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const duration = 2000;
      const increment = value / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setAnimatedValue(Math.floor(current));
      }, 16);

      return () => clearInterval(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{animatedValue.toLocaleString()}</p>
            {description && (
              <p className="text-xs text-gray-500 mb-2">{description}</p>
            )}
            <div className="flex items-center">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`p-4 rounded-full ${bgColor} animate-pulse`}>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityWidgetProps {
  activities: Array<{
    type: string;
    title: string;
    user: string;
    time: string;
    icon: any;
    color: string;
    bgColor: string;
  }>;
}

const ActivityWidget = ({ activities }: ActivityWidgetProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-500" />
          Activité Récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`p-3 rounded-full ${activity.bgColor} animate-pulse`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs animate-pulse">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface TopCreatorsWidgetProps {
  creators: Array<{
    name: string;
    country: string;
    views: number;
    rating: number;
    image: string;
  }>;
}

const TopCreatorsWidget = ({ creators }: TopCreatorsWidgetProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Top Créateurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {creators.map((creator, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-clofas-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <img 
                src={creator.image} 
                alt={creator.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{creator.name}</p>
                <p className="text-xs text-gray-600">{creator.country}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{creator.views} vues</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-sm">{creator.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface PerformanceWidgetProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

const PerformanceWidget = ({ data }: PerformanceWidgetProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
          Performance des Sections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-600">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface QuickActionsWidgetProps {
  actions: Array<{
    title: string;
    description: string;
    icon: any;
    color: string;
    href: string;
  }>;
  onActionClick: (href: string) => void;
}

const QuickActionsWidget = ({ actions, onActionClick }: QuickActionsWidgetProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Actions Rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-300 hover:scale-105"
              onClick={() => onActionClick(action.href)}
            >
              <div className={`p-3 rounded-full ${action.color} text-white animate-bounce`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface RealTimeWidgetProps {
  title: string;
  value: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdate: Date;
}

const RealTimeWidget = ({ title, value, status, lastUpdate }: RealTimeWidgetProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'warning': return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'offline': return <AlertCircle className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-purple-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-2xl font-bold text-clofas-coral mb-2">
            {value}
          </div>
          <p className="text-sm text-gray-600 mb-3">Dernière mise à jour</p>
          <div className="mb-3">
            <Badge className={getStatusColor()}>
              {getStatusIcon()}
              {status === 'online' ? 'En ligne' : status === 'warning' ? 'Attention' : 'Hors ligne'}
            </Badge>
          </div>
          <p className="text-xs text-gray-500">
            {lastUpdate.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export {
  MetricWidget,
  ActivityWidget,
  TopCreatorsWidget,
  PerformanceWidget,
  QuickActionsWidget,
  RealTimeWidget
};
