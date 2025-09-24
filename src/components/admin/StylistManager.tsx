import React, { useState } from 'react';

interface Stylist {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  bio: string;
}

const StylistManager: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([
    {
      id: 1,
      name: 'Angèle Epouta',
      email: 'angele.epouta@clofas.ga',
      phone: '+241 66 66 89 00',
      specialty: 'Haute Couture',
      status: 'active',
      joinDate: '2023-01-15',
      bio: 'Maître créatrice reconnue pour son excellence artistique'
    },
    {
      id: 2,
      name: 'Beitch Faro',
      email: 'beitch.faro@clofas.ga',
      phone: '+241 66 66 89 01',
      specialty: 'Promotion',
      status: 'active',
      joinDate: '2023-01-01',
      bio: 'Fondatrice et promotrice de l\'événement CLOFAS 241'
    },
    {
      id: 3,
      name: 'Angelina Creations',
      email: 'angelina@creations.ga',
      phone: '+241 66 66 89 02',
      specialty: 'Maison de Couture',
      status: 'active',
      joinDate: '2023-02-10',
      bio: 'Atelier réputé pour ses pièces uniques'
    },
    {
      id: 4,
      name: 'Lady Riaba',
      email: 'lady.riaba@clofas.ga',
      phone: '+241 66 66 89 03',
      specialty: 'Créatrice Émergente',
      status: 'pending',
      joinDate: '2024-01-15',
      bio: 'Nouvelle génération de créateurs gabonais'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);
  const [formData, setFormData] = useState<Omit<Stylist, 'id'>>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    status: 'pending',
    joinDate: new Date().toISOString().split('T')[0],
    bio: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--gabon-green)';
      case 'pending': return 'var(--gabon-yellow)';
      case 'inactive': return '#ef4444';
      default: return 'var(--neutral-500)';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStylist) {
      setStylists(stylists.map(s => s.id === editingStylist.id ? { ...editingStylist, ...formData } : s));
    } else {
      const newStylist: Stylist = {
        id: Math.max(...stylists.map(s => s.id)) + 1,
        ...formData
      };
      setStylists([...stylists, newStylist]);
    }
    setShowForm(false);
    setEditingStylist(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      bio: ''
    });
  };

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist);
    setFormData({
      name: stylist.name,
      email: stylist.email,
      phone: stylist.phone,
      specialty: stylist.specialty,
      status: stylist.status,
      joinDate: stylist.joinDate,
      bio: stylist.bio
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce styliste ?')) {
      setStylists(stylists.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Stylistes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-minimal btn-primary"
          style={{ backgroundColor: 'var(--gabon-green)' }}
        >
          Ajouter un Styliste
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="card-minimal p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingStylist ? 'Modifier le styliste' : 'Nouveau styliste'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="active">Actif</option>
                  <option value="pending">En attente</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'adhésion
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biographie
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingStylist(null);
                }}
                className="btn-minimal btn-ghost"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn-minimal btn-primary"
                style={{ backgroundColor: 'var(--gabon-green)' }}
              >
                {editingStylist ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des stylistes */}
      <div className="card-minimal">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Liste des stylistes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stylists.map((stylist) => (
            <div key={stylist.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                       style={{ backgroundColor: 'var(--gabon-green)' }}>
                    {stylist.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{stylist.name}</h4>
                    <p className="text-sm text-gray-600">{stylist.specialty}</p>
                    <p className="text-xs text-gray-500">{stylist.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(stylist.status) }}
                  >
                    {stylist.status === 'active' ? 'Actif' : 
                     stylist.status === 'pending' ? 'En attente' : 'Inactif'}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(stylist)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(stylist.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylistManager;
