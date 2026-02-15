import React, { useState } from 'react'; 
import { FaUserPlus, FaUserCircle, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';

const Utilisateurs = () => {

  const [showForm, setShowForm] = useState(false);

  const users = [
    { id: 1, nom: 'wassim zaait', email: 'wassim@gmail.com', tel: '0612345678', role: 'Client' },
    { id: 2, nom: 'Mohamed cherkawi', email: 'mohamed@gmail.com', tel: '0698765432', role: 'Client' },
  ];

  return (
    <div className="relative space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <FaUserPlus /> Nouveau Client
        </button>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl text-slate-300">
                <FaUserCircle />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{user.nom}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold uppercase tracking-wider">{user.role}</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-slate-400" /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-slate-400" /> {user.tel}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex justify-end gap-3">
              <button className="text-sm text-blue-600 font-semibold hover:underline">Modifier</button>
              <button className="text-sm text-red-600 font-semibold hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
      </div>


      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200">
            {/* Header d l-Form */}
            <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800">Ajouter Nouveau Client</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <FaTimes />
              </button>
            </div>

         
            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nom Complet</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="votre nom complet" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="x@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="xx xx xx xx xx" />
              </div>
               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Adress</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="xx xx xx xx xx" />
              </div>
               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">code postal</label>
                <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="xx xx xx xx xx" />
              </div>

          
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;