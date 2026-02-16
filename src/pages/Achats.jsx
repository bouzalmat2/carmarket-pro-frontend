import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaWallet, FaCar, FaUser, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';
import apiRequest from '../lib/apiRequest';

const Achats = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  // --- Charger les achats depuis l'API (Admin) ---
  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.get('/purchases');
      setPurchases(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des achats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // --- Passer un achat en PAID (Admin) ---
  const handleMarkAsPaid = async (id) => {
    if (!window.confirm("Marquer cet achat comme payé ?")) return;
    try {
      await apiRequest.put(`/purchases/${id}/paid`);
      fetchPurchases();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  // --- Passer un achat en READY (Admin) ---
  const handleMarkAsReady = async (id) => {
    if (!window.confirm("Marquer cet achat comme prêt ?")) return;
    try {
      await apiRequest.put(`/purchases/${id}/ready`);
      fetchPurchases();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  // --- Calculer le total des dépenses ---
  const totalDepenses = purchases.reduce((acc, curr) => acc + curr.price, 0);

  // --- Filtrer les achats ---
  const filteredPurchases = purchases.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.vehicleBrand?.toLowerCase().includes(q) ||
      item.vehicleModel?.toLowerCase().includes(q) ||
      item.userName?.toLowerCase().includes(q)
    );
  });

  // --- Couleurs des statuts ---
  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-amber-100 text-amber-700 border border-amber-200',
      PAID: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      READY: 'bg-blue-100 text-blue-700 border border-blue-200'
    };
    return colors[status] || 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  // --- Formater la date ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Chargement des achats...</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gestion des Achats</h1>
          <p className="text-slate-500 text-sm">Suivi des achats de véhicules par les clients.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200">
            <FaWallet />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Total Dépensé</p>
            <p className="text-2xl font-black text-emerald-900">{totalDepenses.toLocaleString()} DH</p>
          </div>
        </div>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl font-bold text-sm">{error}</div>}

      {/* Barre de recherche */}
      <div className="relative w-full sm:w-96">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Rechercher par véhicule ou client..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium"
        />
      </div>

      {/* Liste vide */}
      {!loading && filteredPurchases.length === 0 && !error && (
        <div className="text-center py-20">
          <FaShoppingCart className="mx-auto text-5xl text-slate-300 mb-4" />
          <p className="text-slate-400 font-bold text-lg">
            {searchTerm ? 'Aucun achat trouvé' : 'Aucun achat enregistré'}
          </p>
        </div>
      )}

      {/* Grille des achats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPurchases.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
            
            {/* Header avec statut */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xl shadow-inner">
                <FaShoppingCart />
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${getStatusColor(item.purchaseStatus)}`}>
                  {item.purchaseStatus}
                </span>
              </div>
            </div>

            {/* Informations véhicule */}
            <div className="mb-4">
              <h3 className="font-bold text-slate-800 text-lg mb-1">
                {item.vehicleBrand} {item.vehicleModel}
              </h3>
              <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1 uppercase">
                <FaCar className="text-emerald-500" /> Véhicule #{item.vehicleId}
              </p>
            </div>

            {/* Informations client */}
            <div className="mb-4 pb-4 border-b border-slate-50">
              <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1 uppercase mb-1">
                <FaUser className="text-blue-500" /> Client
              </p>
              <p className="text-sm font-semibold text-slate-700">{item.userName}</p>
            </div>

            {/* Date et prix */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Date Achat</p>
                <p className="text-xs font-black text-slate-600">{formatDate(item.purchaseDate)}</p>
              </div>
              <span className="text-2xl font-black text-emerald-600 tracking-tighter">{item.price?.toLocaleString()} DH</span>
            </div>

            {/* Actions Admin selon le statut */}
            <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
              {item.purchaseStatus === 'PENDING' && (
                <button 
                  onClick={() => handleMarkAsPaid(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                >
                  <FaCheckCircle /> Marquer Payé
                </button>
              )}
              {item.purchaseStatus === 'PAID' && (
                <button 
                  onClick={() => handleMarkAsReady(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                >
                  <FaClock /> Marquer Prêt
                </button>
              )}
              {item.purchaseStatus === 'READY' && (
                <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-wider">
                  <FaCheckCircle /> Terminé
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achats;