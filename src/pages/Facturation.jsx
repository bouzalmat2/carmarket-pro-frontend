import React, { useState } from 'react';
import { FaCalculator, FaFileInvoiceDollar } from 'react-icons/fa';

const Facturation = () => {
  const [days, setDays] = useState(1);
  const [pricePerDay, setPricePerDay] = useState(250);

  
  const total = days * pricePerDay;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <FaFileInvoiceDollar className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Calculateur de Facturation</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 gap-6">
       
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-900">Prix de location ($/Jour)</label>
            <input 
              type="number" 
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

   
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-900">Nombre de jours</label>
            <input 
              type="number" 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

   
          <div className="mt-2 p-2 bg-blue-600 rounded-2xl text-white flex justify-between items-center shadow-lg shadow-blue-200">
            <div>
              <p className="text-blue-100 text-xs uppercase font-bold tracking-widest">Total à payer</p>
              <p className="text-3xl font-black">{total} $</p>
            </div>
            <FaCalculator className="text-4xl opacity-20" />
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
            Générer la facture (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facturation;