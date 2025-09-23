import { Routes, Route } from 'react-router-dom';
import SimpleAdminLayout from '@/components/admin/SimpleAdminLayout';
import SimpleDashboard from './SimpleDashboard';
import CreatorsManagement from './CreatorsManagement';
import ParticipantsManagement from './ParticipantsManagement';
import EventsManagement from './EventsManagement';
import ImageManagement from './ImageManagement';
import ContentManagement from './ContentManagement';
import SiteSettings from './SiteSettings';
import ImportStylistImagesPage from './ImportStylistImagesPage';
import BackgroundManager from '@/components/BackgroundManager';
import AutoSaveManager from '@/components/admin/AutoSaveManager';

import MessagesManagement from './MessagesManagement';
import RealTimeNotifications from '@/components/admin/RealTimeNotifications';

const SimpleAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleAdminLayout />}>
        <Route index element={<SimpleDashboard />} />
        <Route path="creators" element={<CreatorsManagement />} />
        <Route path="participants" element={<ParticipantsManagement />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="gallery" element={<ImageManagement />} />
        <Route path="messages" element={<MessagesManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="import-stylist-images" element={<ImportStylistImagesPage />} />
        <Route path="background" element={<BackgroundManager />} />
        <Route path="autosave" element={<AutoSaveManager />} />
        <Route path="notifications" element={<RealTimeNotifications />} />
      </Route>
    </Routes>
  );
};

export default SimpleAdminRoutes;
