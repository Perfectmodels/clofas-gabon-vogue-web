import React, { useState } from 'react';

interface Edition {
  id: number;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  description: string;
  participants: number;
}

const EditionManager: React.FC = () => {
  const [editions, setEditions] = useState<Edition[]>([
    {
      id: 1,
      name: 'CLOFAS 241 - Édition 2024',
      year: 2024,
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      location: 'Libreville, Gabon',
      status: 'active',
      description: 'Édition principale 2024 avec 8 créateurs participants',
      participants: 8
    },
    {
      id: 2,
      name: 'CLOFAS 241 - Édition 2023',
      year: 2023,
      startDate: '2023-05-20',
      endDate: '2023-05-22',
      location: 'Libreville, Gabon',
      status: 'completed',
      description: 'Première édition du CLOFAS 241',
      participants: 6
    },
    {
      id: 3,
      name: 'CLOFAS 241 - Édition 2025',
      year: 2025,
      startDate: '2025-06-10',
      endDate: '2025-06-12',
      location: 'Libreville, Gabon',
      status: 'planning',
      description: 'Édition 2025 en préparation',
      participants: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEdition, setEditingEdition] = useState<Edition | null>(null);
  const [formData, setFormData] = useState<Omit<Edition, 'id'>>({
    name: '',
    year: new Date().getFullYear(),
    startDate: '',
    endDate: '',
    location: '',
    status: 'planning',
    description: '',
    participants: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--gabon-green)';
      case 'planning': return 'var(--gabon-yellow)';
      case 'completed': return 'var(--gabon-blue)';
      case 'cancelled': return '#ef4444';
      default: return 'var(--neutral-500)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'planning': return 'En planification';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEdition) {
      setEditions(editions.map(e => e.id === editingEdition.id ? { ...editingEdition, ...formData } : e));
    } else {
      const newEdition: Edition = {
        id: Math.max(...editions.map(e => e.id)) + 1,
        ...formData
      };
      setEditions([...editions, newEdition]);
    }
    setShowForm(false);
    setEditingEdition(null);
    setFormData({
      name: '',
      year: new Date().getFullYear(),
      startDate: '',
      endDate: '',
      location: '',
      status: 'planning',
      description: '',
      participants: 0
    });
  };

  const handleEdit = (edition: Edition) => {
    setEditingEdition(edition);
    setFormData({
      name: edition.name,
      year: edition.year,
      startDate: edition.startDate,
      endDate: edition.endDate,
      location: edition.location,
      status: edition.status,
      description: edition.description,
      participants: edition.participants
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette édition ?')) {
      setEditions(editions.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Éditions</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-minimal btn-primary"
          style={{ backgroundColor: 'var(--gabon-green)' }}
        >
          Nouvelle Édition
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="card-minimal p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingEdition ? 'Modifier l\'édition' : 'Nouvelle édition'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'édition
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
                  Année
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="planning">En planification</option>
                  <option value="active">En cours</option>
                  <option value="completed">Terminée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  setEditingEdition(null);
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
                {editingEdition ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des éditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {editions.map((edition) => (
          <div key={edition.id} className="card-minimal p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{edition.name}</h3>
                <p className="text-sm text-gray-600">{edition.year}</p>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: getStatusColor(edition.status) }}
              >
                {getStatusText(edition.status)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Dates:</strong> {edition.startDate} - {edition.endDate}</p>
              <p><strong>Lieu:</strong> {edition.location}</p>
              <p><strong>Participants:</strong> {edition.participants}</p>
            </div>
            
            <p className="text-sm text-gray-700 mt-3">{edition.description}</p>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEdit(edition)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(edition.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditionManager;
