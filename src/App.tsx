
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Creators from './pages/Creators';
import About from './pages/About';
import Edition from './pages/Edition';
import News from './pages/News';
import Tickets from './pages/Tickets';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/common/ProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCreatorsPage from './pages/admin/AdminCreatorsPage';
import AdminEditionsPage from './pages/admin/AdminEditionsPage';
import AdminAppearancePage from './pages/admin/AdminAppearancePage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminLayout from './components/admin/common/AdminLayout';

function App() {
  return (
    <Router>
      {/* Le Footer et la Navigation sont déplacés pour s'adapter aux routes sans mise en page */}
      <Routes>
        {/* Routes publiques avec la mise en page par défaut */}
        <Route 
          path="/*" 
          element={
            <>
              <Navigation />
              <main className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/edition" element={<Edition />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Routes du Panel d'Administration sans la navigation/footer public */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  {/* Redirection de /admin vers /admin/dashboard */}
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> 
                  <Route path="/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/creators" element={<AdminCreatorsPage />} />
                  <Route path="/editions" element={<AdminEditionsPage />} />
                  <Route path="/appearance" element={<AdminAppearancePage />} />
                  <Route path="/settings" element={<AdminSettingsPage />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
