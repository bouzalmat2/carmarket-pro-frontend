import React, { useState, useEffect } from 'react'; 
import { FaUserCircle, FaEnvelope, FaPhone, FaUserShield, FaUserSlash, FaTrash, FaToggleOn, FaToggleOff, FaCrown, FaSearch } from 'react-icons/fa';
import apiRequest from '../lib/apiRequest';

const Utilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Récupérer l'email de l'admin connecté depuis le localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentEmail = currentUser.email;

  // --- Charger les utilisateurs depuis l'API ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Activer un utilisateur ---
  const handleEnable = async (id) => {
    try {
      await apiRequest.put(`/users/${id}/enable`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'activation");
    }
  };

  // --- Désactiver un utilisateur ---
  const handleDisable = async (id) => {
    if (!window.confirm("Désactiver cet utilisateur ?")) return;
    try {
      await apiRequest.put(`/users/${id}/disable`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la désactivation");
    }
  };

  // --- Promouvoir en Admin ---
  const handlePromote = async (id) => {
    if (!window.confirm("Promouvoir cet utilisateur en Administrateur ?")) return;
    try {
      await apiRequest.put(`/users/${id}/promote`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la promotion");
    }
  };

  // --- Rétrograder en User ---
  const handleDemote = async (id) => {
    if (!window.confirm("Retirer les droits administrateur de cet utilisateur ?")) return;
    try {
      await apiRequest.put(`/users/${id}/demote`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la rétrogradation");
    }
  };

  // --- Supprimer un utilisateur ---
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return;
    try {
      await apiRequest.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Chargement des utilisateurs...</div>;

  return (
    <div className="relative space-y-6">
      {/* Header + Recherche */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
          <p className="text-slate-500 text-xs tracking-wide">{users.length} utilisateur(s) enregistré(s)</p>
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <FaSearch className="text-xs" />
          </div>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Rechercher par nom ou email..."
          />
        </div>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl font-bold text-sm">{error}</div>}

      {/* Users Grid */}
      {users.length === 0 && !error && (
        <div className="text-center py-20">
          <FaUserCircle className="mx-auto text-5xl text-slate-300 mb-4" />
          <p className="text-slate-400 font-bold text-lg">Aucun utilisateur trouvé</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users
          .filter((user) => {
            const q = search.toLowerCase();
            return user.name?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q);
          })
          .sort((a, b) => {
            // D'abord les admins, puis les users
            if (a.role === 'ADMIN' && b.role !== 'ADMIN') return -1;
            if (a.role !== 'ADMIN' && b.role === 'ADMIN') return 1;
            // Ensuite tri alphabétique par nom
            return (a.name || '').localeCompare(b.name || '', 'fr', { sensitivity: 'base' });
          })
          .map((user) => (
          <div key={user.id} className={`bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all ${!user.enabled ? 'border-rose-200 opacity-70' : 'border-slate-100'}`}>
            
            {/* User Info Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-4xl ${user.role === 'ADMIN' ? 'text-amber-400' : 'text-slate-300'}`}>
                {user.role === 'ADMIN' ? <FaUserShield /> : <FaUserCircle />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 truncate">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider ${
                    user.role === 'ADMIN' 
                      ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  }`}>
                    {user.role}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider ${
                    user.enabled 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}>
                    {user.enabled ? 'Actif' : 'Désactivé'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-slate-400 text-xs" /> 
                <span className="truncate text-xs">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <FaPhone className="text-slate-400 text-xs" /> 
                  <span className="text-xs">{user.phone}</span>
                </div>
              )}
            </div>
            
            {/* Actions Admin */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              
              {/* Label "C'est vous" si c'est l'admin connecté */}
              {user.email === currentEmail && (
                <span className="text-[10px] font-black text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  C'est vous
                </span>
              )}

              {/* Toggle Enable/Disable (pas sur soi-même) */}
              {user.email !== currentEmail && (
                user.enabled ? (
                  <button 
                    onClick={() => handleDisable(user.id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    <FaToggleOff /> Désactiver
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEnable(user.id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    <FaToggleOn /> Activer
                  </button>
                )
              )}

              {/* Toggle Promote/Demote (pas sur soi-même) */}
              {user.email !== currentEmail && (
                user.role === 'USER' ? (
                  <button 
                    onClick={() => handlePromote(user.id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    <FaCrown /> Promouvoir Admin
                  </button>
                ) : (
                  <button 
                    onClick={() => handleDemote(user.id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    <FaUserSlash /> Retirer Admin
                  </button>
                )
              )}

              {/* Delete (pas sur soi-même) */}
              {user.email !== currentEmail && (
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider ml-auto"
                >
                  <FaTrash /> Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Utilisateurs;
