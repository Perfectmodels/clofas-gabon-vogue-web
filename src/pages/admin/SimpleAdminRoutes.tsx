import { Routes, Route } from 'react-router-dom';
import SimpleAdminLayout from '@/components/admin/SimpleAdminLayout';
import SimpleDashboard from './SimpleDashboard';
import CreatorsManagement from './CreatorsManagement';
import ParticipantsManagement from './ParticipantsManagement';
import EventsManagement from './EventsManagement';
import ImageManagement from './ImageManagement';
import ContentManagement from './ContentManagement';
import SiteSettings from './SiteSettings';

const Messages = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      <p className="text-gray-600">Communication et notifications</p>
    </div>
    <div className="bg-white p-6 rounded-lg border">
      <p className="text-gray-600">Cette page sera développée pour gérer les messages.</p>
    </div>
  </div>
);

const SimpleAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleAdminLayout />}>
        <Route index element={<SimpleDashboard />} />
        <Route path="creators" element={<CreatorsManagement />} />
        <Route path="participants" element={<ParticipantsManagement />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="gallery" element={<ImageManagement />} />
        <Route path="messages" element={<Messages />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="settings" element={<SiteSettings />} />
      </Route>
    </Routes>
  );
};

export default SimpleAdminRoutes;
