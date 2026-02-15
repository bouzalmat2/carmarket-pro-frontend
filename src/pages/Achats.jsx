import React, { useState } from 'react';
import { FaPlus, FaShoppingCart, FaTools, FaGasPump, FaFileInvoice, FaSearch, FaTimes, FaWallet, FaCar } from 'react-icons/fa';

const Achats = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [purchases] = useState([
    { 
      id: 1, 
      type: 'Maintenance', 
      objet: 'Vidange Dacia', 
      price: 600, 
      purchaseDate: '2026-01-20', 
      paymentStatus: 'PAID', 
      purchaseStatus: 'DELIVERED',
      vehicleModel: 'Dacia Logan',
      icon: <FaTools /> 
    },
    { 
      id: 2, 
      type: 'Carburant', 
      objet: 'Plein Renault Clio', 
      price: 550, 
      purchaseDate: '2026-01-22', 
      paymentStatus: 'PAID',
      purchaseStatus: 'READY',
      vehicleModel: 'Renault Clio',
      icon: <FaGasPump /> 
    },
  ]);

 
  const totalDepenses = purchases.reduce((acc, curr) => acc + curr.price, 0);

  const filteredPurchases = purchases.filter(item => 
    item.objet.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const getStatusColor = (status) => {
    const colors = {
      PAID: 'bg-emerald-100 text-emerald-700',
      PENDING: 'bg-amber-100 text-amber-700',
      FAILED: 'bg-rose-100 text-rose-700',
      READY: 'bg-blue-100 text-blue-700',
      DELIVERED: 'bg-indigo-100 text-indigo-700'
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6 p-4">
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Gestion des Achats</h1>
          <p className="text-slate-500 text-sm">Suivi basé sur l'architecture SmartCar.</p>
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

      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96 text-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher par objet ou véhicule..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium"
          />
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 font-bold text-sm"
        >
          <FaPlus /> Ajouter un achat
        </button>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPurchases.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative">
            <div className="flex justify-between items-start mb-4">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xl shadow-inner">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${getStatusColor(item.paymentStatus)}`}>
                  {item.paymentStatus}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">{item.type}</span>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 text-lg">{item.objet}</h3>
            <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1 mt-1 uppercase">
              <FaCar className="text-emerald-500" /> {item.vehicleModel}
            </p>

            <div className="mt-6 flex justify-between items-end border-t border-slate-50 pt-4">
              <div>
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Date Achat</p>
                <p className="text-xs font-black text-slate-600">{item.purchaseDate}</p>
              </div>
              <span className="text-2xl font-black text-emerald-600 tracking-tighter">{item.price} DH</span>
            </div>
          </div>
        ))}
      </div>

     
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden text-sm">
            <div className="bg-emerald-600 p-8 text-white relative">
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-emerald-200 hover:text-white transition-colors">
                <FaTimes size={20} />
              </button>
              <h3 className="text-xl font-black">Nouveau Purchase</h3>
              <p className="text-emerald-100/80 text-xs mt-1 italic tracking-wide">Lien direct avec l'inventaire véhicule.</p>
            </div>
            
            <form className="p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Véhicule </label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold">
                    <option>Dacia Logan</option>
                    <option>Renault Clio</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Status</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs">
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Objet / Description</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" placeholder="Ex: Assurance Annuelle" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-emerald-600">Price (double)</label>
                  <input type="number" className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-600" placeholder="0" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">purchaseDate</label>
                  <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-50 rounded-xl">Annuler</button>
                <button type="submit" className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all">
                  ENREGISTRER ACHAT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achats;