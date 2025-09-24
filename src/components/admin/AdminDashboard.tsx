import React, { useState, useEffect } from 'react';

interface DashboardStats {
  stylists: number;
  emails: number;
  editions: number;
  visitors: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    stylists: 8,
    emails: 156,
    editions: 3,
    visitors: 1247
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Nouveau styliste ajouté', user: 'Angèle Epouta', time: 'Il y a 2h' },
    { id: 2, action: 'Email envoyé', user: 'Newsletter mensuelle', time: 'Il y a 4h' },
    { id: 3, action: 'Édition mise à jour', user: 'CLOFAS 2024', time: 'Il y a 1 jour' },
    { id: 4, action: 'Visiteur enregistré', user: 'Nouveau contact', time: 'Il y a 2 jours' }
  ]);

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-minimal p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stylistes</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gabon-green)' }}>
                {stats.stylists}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-green)' }}>
              <span className="text-white text-sm">👥</span>
            </div>
          </div>
        </div>

        <div className="card-minimal p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emails</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gabon-yellow)' }}>
                {stats.emails}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-yellow)' }}>
              <span className="text-white text-sm">📧</span>
            </div>
          </div>
        </div>

        <div className="card-minimal p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Éditions</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gabon-blue)' }}>
                {stats.editions}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-blue)' }}>
              <span className="text-white text-sm">📅</span>
            </div>
          </div>
        </div>

        <div className="card-minimal p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visiteurs</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gabon-green)' }}>
                {stats.visitors}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-green)' }}>
              <span className="text-white text-sm">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-minimal p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-green)' }}>
              <span className="text-white">👥</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Gérer les stylistes</h3>
              <p className="text-sm text-gray-600">Ajouter, modifier, supprimer</p>
            </div>
          </div>
        </div>

        <div className="card-minimal p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-yellow)' }}>
              <span className="text-white">📧</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Gérer les emails</h3>
              <p className="text-sm text-gray-600">Newsletters, contacts</p>
            </div>
          </div>
        </div>

        <div className="card-minimal p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--gabon-blue)' }}>
              <span className="text-white">📅</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Gérer les éditions</h3>
              <p className="text-sm text-gray-600">Événements, dates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="card-minimal p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--gabon-green)' }}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
