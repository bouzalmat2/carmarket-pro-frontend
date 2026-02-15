import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaGasPump, FaCarSide } from 'react-icons/fa';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Statistiques = () => {

  const lineData = [
    { name: 'Jan', revenu: 4000, depenses: 2400 },
    { name: 'Fév', revenu: 3000, depenses: 1398 },
    { name: 'Mar', revenu: 2000, depenses: 9800 },
    { name: 'Avr', revenu: 2780, depenses: 3908 },
    { name: 'Mai', revenu: 1890, depenses: 4800 },
    { name: 'Juin', revenu: 2390, depenses: 3800 },
  ];

  
  const pieData = [
    { name: 'Maintenance', value: 400 },
    { name: 'Carburant', value: 300 },
    { name: 'Assurance', value: 300 },
  ];
  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  const stats = {
    revenuTotal: 125000,
    depensesTotale: 45000,
    profitNet: 80000,
    croissance: "+15.4%"
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50/50">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FaChartLine className="text-indigo-600" /> Statistiques
          </h1>
          <p className="text-slate-500 text-sm">Vue d'ensemble de votre performance financière.</p>
        </div>
        <div className="text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          MIS À JOUR: AUJOURD'HUI
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FaMoneyBillWave size={20} /></div>
            <span className="text-emerald-500 font-black text-xs bg-emerald-50 px-2 py-1 rounded-lg">+{stats.croissance}</span>
          </div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Revenu Mensuel</p>
          <p className="text-2xl font-black text-slate-800">{stats.revenuTotal.toLocaleString()} DH</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><FaGasPump size={20} /></div>
            <span className="text-rose-500 font-black text-xs bg-rose-50 px-2 py-1 rounded-lg">-5%</span>
          </div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Dépenses Totales</p>
          <p className="text-2xl font-black text-slate-800">{stats.depensesTotale.toLocaleString()} DH</p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 text-white flex flex-col justify-center">
          <p className="text-indigo-100 font-bold text-[10px] uppercase tracking-widest mb-1">Profit Net</p>
          <p className="text-3xl font-black">{stats.profitNet.toLocaleString()} DH</p>
          <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[75%]"></div>
          </div>
        </div>
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graph Area L-kbir */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-800 text-lg mb-6 tracking-tight">Analyse de Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="revenu" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

     
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-black text-slate-800 text-lg mb-2 tracking-tight">Répartition Achats</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-slate-500">{item.name}</span>
                </div>
                <span className="text-slate-800">{item.value} DH</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;