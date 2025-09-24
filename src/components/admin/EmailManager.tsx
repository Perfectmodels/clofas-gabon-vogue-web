import React, { useState } from 'react';

interface Email {
  id: number;
  subject: string;
  recipient: string;
  status: 'sent' | 'pending' | 'failed';
  date: string;
  type: 'newsletter' | 'invitation' | 'reminder';
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([
    { id: 1, subject: 'Newsletter CLOFAS 241 - Janvier 2024', recipient: 'newsletter@clofas.ga', status: 'sent', date: '2024-01-15', type: 'newsletter' },
    { id: 2, subject: 'Invitation Édition 2024', recipient: 'stylists@clofas.ga', status: 'sent', date: '2024-01-10', type: 'invitation' },
    { id: 3, subject: 'Rappel Soumission', recipient: 'creators@clofas.ga', status: 'pending', date: '2024-01-20', type: 'reminder' },
    { id: 4, subject: 'Newsletter CLOFAS 241 - Décembre 2023', recipient: 'newsletter@clofas.ga', status: 'sent', date: '2023-12-15', type: 'newsletter' }
  ]);

  const [showCompose, setShowCompose] = useState(false);
  const [newEmail, setNewEmail] = useState({
    subject: '',
    recipient: '',
    type: 'newsletter' as const,
    content: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'var(--gabon-green)';
      case 'pending': return 'var(--gabon-yellow)';
      case 'failed': return '#ef4444';
      default: return 'var(--neutral-500)';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'newsletter': return '📰';
      case 'invitation': return '📨';
      case 'reminder': return '⏰';
      default: return '📧';
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const email: Email = {
      id: emails.length + 1,
      subject: newEmail.subject,
      recipient: newEmail.recipient,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      type: newEmail.type
    };
    setEmails([email, ...emails]);
    setNewEmail({ subject: '', recipient: '', type: 'newsletter', content: '' });
    setShowCompose(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton de composition */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Emails</h2>
        <button
          onClick={() => setShowCompose(true)}
          className="btn-minimal btn-primary"
          style={{ backgroundColor: 'var(--gabon-green)' }}
        >
          Nouvel Email
        </button>
      </div>

      {/* Formulaire de composition */}
      {showCompose && (
        <div className="card-minimal p-6">
          <h3 className="text-lg font-semibold mb-4">Composer un email</h3>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinataire
                </label>
                <input
                  type="email"
                  value={newEmail.recipient}
                  onChange={(e) => setNewEmail({ ...newEmail, recipient: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="email@exemple.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newEmail.type}
                  onChange={(e) => setNewEmail({ ...newEmail, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="newsletter">Newsletter</option>
                  <option value="invitation">Invitation</option>
                  <option value="reminder">Rappel</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Sujet de l'email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea
                value={newEmail.content}
                onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contenu de l'email..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="btn-minimal btn-ghost"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn-minimal btn-primary"
                style={{ backgroundColor: 'var(--gabon-green)' }}
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des emails */}
      <div className="card-minimal">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Emails envoyés</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {emails.map((email) => (
            <div key={email.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getTypeIcon(email.type)}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{email.subject}</h4>
                    <p className="text-sm text-gray-600">{email.recipient}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{email.date}</span>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(email.status) }}
                  >
                    {email.status === 'sent' ? 'Envoyé' : 
                     email.status === 'pending' ? 'En attente' : 'Échec'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailManager;
