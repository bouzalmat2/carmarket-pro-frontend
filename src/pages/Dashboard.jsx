import React from 'react';
import { FaCar, FaUsers, FaMoneyBillWave, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { id: 1, label: 'Véhicules Totaux', value: '24', icon: <FaCar />, color: 'bg-blue-500' },
    { id: 2, label: 'Clients Actifs', value: '156', icon: <FaUsers />, color: 'bg-indigo-500' },
    { id: 3, label: 'Revenu Mensuel', value: '45,000 DH', icon: <FaMoneyBillWave />, color: 'bg-green-500' },
    { id: 4, label: 'Locations en cours', value: '8', icon: <FaCalendarCheck />, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="text-slate-500 text-sm">Aperçu général de votre activité SmartCar.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${stat.color} p-4 rounded-xl text-white text-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Layout placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Dernières Locations</h3>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 italic">Aucune location récente à afficher...</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
          <h3 className="font-bold mb-2">Conseil du jour</h3>
          <p className="text-blue-100 text-sm opacity-90">
            Pensez à vérifier l'état des pneus des véhicules en statut "Maintenance" avant le weekend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;