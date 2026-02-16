import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaUser, FaClock, FaTrash, FaTimes, FaCheckCircle, FaUndo, FaBan } from 'react-icons/fa';
import apiRequest from '../lib/apiRequest';


const Reservations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchReservations = async () => {
    try {
      const response = await apiRequest.get('/reservations');
      const data = response.data;
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // --- ACTIONS ADMIN ---

  const handleAccept = async (id) => {
    if (!window.confirm("Accepter cette réservation ?")) return;
    try {
      await apiRequest.put(`/reservations/${id}/accept`);
      fetchReservations(); 
    } catch (err) { alert(err.response?.data?.message || "Erreur lors de l'acceptation"); }
  };

  const handleReturn = async (id) => {
    if (!window.confirm("Marquer comme retournée ? (Libère le véhicule)")) return;
    try {
      await apiRequest.put(`/reservations/${id}/return`);
      fetchReservations();
    } catch (err) { alert(err.response?.data?.message || "Erreur lors du retour"); }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Annuler cette réservation ?")) return;
    try {
      await apiRequest.put(`/reservations/${id}/cancel`);
      fetchReservations();
    } catch (err) { alert(err.response?.data?.message || "Erreur lors de l'annulation"); }
  };

  const statusColors = {
    REQUESTED: 'bg-amber-100 text-amber-700',
    ACCEPTED: 'bg-blue-100 text-blue-700', 
    IN_PROGRESS: 'bg-indigo-100 text-indigo-700',
    RETURNED: 'bg-emerald-100 text-emerald-700',
    LATE: 'bg-orange-100 text-orange-700',
    CANCELED: 'bg-rose-100 text-rose-700'
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Chargement des données...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Gestion des Réservations</h1>
          <p className="text-slate-500 text-xs tracking-wide">Interface synchronisée avec le Backend (Spring Boot)</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl">{error}</div>}

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Véhicule</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates & Prix</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                      <FaUser className="text-blue-400 text-[10px]" /> {booking.userName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium italic">
                      {booking.vehicleBrand} {booking.vehicleModel}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px]">
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
                 
                    {booking.status === 'REQUESTED' && (
                      <button onClick={() => handleAccept(booking.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg title='Accepter'">
                        Accepter
                      </button>
                    )}

                    {(booking.status === 'IN_PROGRESS' || booking.status === 'LATE') && (
                      <button onClick={() => handleReturn(booking.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg title='Marquer Retour'">
                        Retourner
                      </button>
                    )}

                    {(booking.status === 'REQUESTED' || booking.status === 'ACCEPTED') && (
                      <button onClick={() => handleCancel(booking.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg title='Annuler'">
                        Annuler
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;