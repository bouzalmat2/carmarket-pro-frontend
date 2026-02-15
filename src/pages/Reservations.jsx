import React, { useState } from 'react';
import { FaCalendarPlus, FaUser, FaCar, FaClock, FaTrash, FaTimes, FaEdit, FaCheckCircle } from 'react-icons/fa';

const Reservations = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  

  const [currentBooking, setCurrentBooking] = useState({ 
    id: null, 
    startDate: '', 
    endDate: '',   
    totalPrice: 0, 
    status: 'REQUESTED', 
    clientName: '', 
    vehicleModel: '' 
  });

  const [bookings, setBookings] = useState([
    { id: 1, clientName: 'Mohamed cherkawi', vehicleModel: 'AMG GT 63', startDate: '2026-02-01', endDate: '2026-02-05', status: 'IN_PROGRESS', totalPrice: 5000 },
    { id: 2, clientName: 'wassim zaait', vehicleModel: 'BMW M5 (G90)', startDate: '2026-02-10', endDate: '2026-02-15', status: 'READY', totalPrice: 7500 },
  ]);

  // Status Colors based on Enum
  const statusColors = {
    REQUESTED: 'bg-amber-100 text-amber-700',
    READY: 'bg-blue-100 text-blue-700',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-700',
    RETURNED: 'bg-emerald-100 text-emerald-700',
    CANCELED: 'bg-rose-100 text-rose-700'
  };

  const handleEdit = (booking) => {
    setIsEditing(true);
    setCurrentBooking(booking);
    setShowForm(true);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentBooking({ id: null, startDate: '', endDate: '', totalPrice: 0, status: 'REQUESTED', clientName: '', vehicleModel: 'AMG GT 63' });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Gestion des Réservations</h1>
          <p className="text-slate-500 text-xs">Système aligné sur l'architecture SmartCar.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md text-sm font-bold">
          <FaCalendarPlus /> Nouvelle Réservation
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Véhicule</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates & Prix</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 flex items-center gap-2"><FaUser className="text-blue-400 text-[10px]" /> {booking.clientName}</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">{booking.vehicleModel}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs italic">
                      <FaClock className="text-blue-300" /> {booking.startDate} <span className="text-slate-300">→</span> {booking.endDate}
                    </div>
                    <span className="text-indigo-600 font-black text-xs italic">{booking.totalPrice} DH</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(booking)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><FaEdit size={14} /></button>
                    <button onClick={() => setBookings(bookings.filter(b => b.id !== booking.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><FaTrash size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-sm font-medium">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className={`${isEditing ? 'bg-blue-600' : 'bg-indigo-600'} p-6 text-white relative`}>
              <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 text-white/50 hover:text-white"><FaTimes /></button>
              <h3 className="text-lg font-black tracking-tight">{isEditing ? 'Mettre à jour la Réservation' : ' Nouvelle Réservation Client'}</h3>
            </div>

            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Client (User)</label>
                  <input type="text" value={currentBooking.clientName} onChange={(e) => setCurrentBooking({...currentBooking, clientName: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nom complet" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Status (Enum)</label>
                  <select value={currentBooking.status} onChange={(e) => setCurrentBooking({...currentBooking, status: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-xs">
                    <option value="REQUESTED">REQUESTED</option>
                    <option value="READY">READY</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RETURNED">RETURNED</option>
                    <option value="CANCELED">CANCELED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">startDate</label>
                  <input type="date" value={currentBooking.startDate} onChange={(e) => setCurrentBooking({...currentBooking, startDate: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">endDate</label>
                  <input type="date" value={currentBooking.endDate} onChange={(e) => setCurrentBooking({...currentBooking, endDate: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">totalPrice (DH)</label>
                <input type="number" value={currentBooking.totalPrice} onChange={(e) => setCurrentBooking({...currentBooking, totalPrice: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-indigo-600" />
              </div>

              <div className="pt-4 flex gap-3 font-black uppercase tracking-widest">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 text-slate-400 hover:bg-slate-50 rounded-xl text-[11px]">Annuler</button>
                <button type="submit" className="flex-[2] py-3 bg-slate-900 text-white rounded-xl shadow-lg active:scale-95 transition-all text-[11px]">
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

export default Reservations;