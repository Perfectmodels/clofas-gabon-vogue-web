import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import EnhancedAdminLayout from '@/components/admin/EnhancedAdminLayout';
import Dashboard from './Dashboard';
import EnhancedDashboard from './EnhancedDashboard';
import Registrations from './Registrations';
import ContentManagement from './ContentManagement';
import ImageManagement from './ImageManagement';
import EventsManagement from './EventsManagement';
import SiteSettings from './SiteSettings';
import CreatorsManagement from './CreatorsManagement';
import CreatorGalleriesManagement from './CreatorGalleriesManagement';

// Composants temporaires pour les routes non encore créées
const MessagesManagement = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-clofas-dark mb-4">Gestion des Messages</h2>
    <p className="text-gray-600">Cette section sera bientôt disponible</p>
  </div>
);

const Analytics = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-clofas-dark mb-4">Analytiques</h2>
    <p className="text-gray-600">Cette section sera bientôt disponible</p>
  </div>
);

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EnhancedAdminLayout />}>
        <Route index element={<EnhancedDashboard />} />
        <Route path="registrations" element={<Registrations />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="gallery" element={<ImageManagement />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="messages" element={<MessagesManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<SiteSettings />} />
            <Route path="creators" element={<CreatorsManagement />} />
        {/* Nouvelles routes pour la navigation améliorée */}
        <Route path="validation" element={<MessagesManagement />} />
        <Route path="participant-communication" element={<MessagesManagement />} />
        <Route path="participant-reports" element={<Analytics />} />
        <Route path="creator-galleries" element={<CreatorGalleriesManagement />} />
        <Route path="featured-creators" element={<CreatorsManagement />} />
        <Route path="creator-social" element={<MessagesManagement />} />
        <Route path="workshops" element={<EventsManagement />} />
        <Route path="fashion-show" element={<EventsManagement />} />
        <Route path="venues" element={<EventsManagement />} />
        <Route path="videos" element={<ImageManagement />} />
        <Route path="stories" element={<ImageManagement />} />
        <Route path="newsletter" element={<MessagesManagement />} />
        <Route path="social-media" element={<MessagesManagement />} />
        <Route path="communication-analytics" element={<Analytics />} />
        <Route path="users" element={<MessagesManagement />} />
        <Route path="security" element={<MessagesManagement />} />
        <Route path="logs" element={<MessagesManagement />} />
        <Route path="export" element={<Analytics />} />
        <Route path="quick-actions" element={<EnhancedDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;