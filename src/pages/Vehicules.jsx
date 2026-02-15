import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGasPump, FaRoad, FaCalendarAlt, FaImage, FaCar, FaCheckCircle, FaExclamationCircle, FaBrain, FaSearchDollar, FaCogs } from 'react-icons/fa';

const Vehicules = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  
  // --- STATE KAMEL BACH L-PREDICTION T-KOUN EXACTE ---
  const [isPredicting, setIsPredicting] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: 2024,
    engine_size: 1.8,    // New field
    fuel_type: 'Petrol',
    transmission: 'Automatic', // New field
    mileage: 0,
    car_type: 'Sedan',    // New field
    drive_type: 'FWD'     // New field
  });
  const [predictionResult, setPredictionResult] = useState(null);

  // Fonction bach t-3ayt l l-Model AI
  const handleAIPrediction = async () => {
    setIsPredicting(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Sift gaç les champs
      });
      const data = await response.json();
      setPredictionResult(data.estimated_price_usd); 
    } catch (error) {
      console.error("Erreur prediction:", error);
      alert("Erreur de connexion avec le serveur AI");
    } finally {
      setIsPredicting(false);
    }
  };

  const [cars] = useState([
    { 
      id: 1, brand: 'Mercedes', model: 'AMG GT 63', year: 2024, kilometrage: 5000, 
      fuelType: 'Essence', price: 1200, available: true,
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400' 
    }
  ]);

  return (
    <div className="p-8 space-y-10 bg-[#f4f7fe] min-h-screen font-sans">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-10 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-100">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-[#1B2559] tracking-tight">Gestion des Véhicules</h1>
          <p className="text-[#A3AED0] font-bold text-sm">Précisez tous les détails techniques pour une estimation exacte.</p>
        </div>
        <button 
          onClick={() => { setEditingCar(null); setPredictionResult(null); setShowForm(true); }}
          className="bg-[#05CD99] text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:shadow-lg transition-all font-black uppercase text-xs tracking-widest"
        >
          <FaPlus /> Ajouter un véhicule
        </button>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden">
             <div className="relative h-48 mb-6 rounded-[1.5rem] overflow-hidden bg-slate-100">
              <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-black text-[#1B2559] tracking-tight">{car.model}</h2>
              <div className="pt-4 border-t border-slate-50">
                <span className="text-2xl font-black text-[#05CD99] tracking-tighter">{car.price} DH</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM COMPLET --- */}
      {showForm && (
        <div className="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4318FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#4318FF]/20">
                  <FaCogs />
                </div>
                <h3 className="text-xl font-black text-[#1B2559]">Détails Techniques (Mode Précis)</h3>
              </div>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><FaTimes size={20}/></button>
            </div>

            <form className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* BRAND & MODEL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Marque</label>
                <input type="text" onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: Toyota" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Modèle</label>
                <input type="text" onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: Corolla" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Année</label>
                <input type="number" onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" defaultValue={2024} />
              </div>

              {/* ENGINE & TRANSMISSION (Key for AI) */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Cylindrée (Engine Size)</label>
                <input type="number" step="0.1" onChange={(e) => setFormData({...formData, engine_size: parseFloat(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 1.8" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Transmission</label>
                <select onChange={(e) => setFormData({...formData, transmission: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Carburant</label>
                <select onChange={(e) => setFormData({...formData, fuel_type: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* MILEAGE, TYPE & DRIVE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Kilométrage</label>
                <input type="number" onChange={(e) => setFormData({...formData, mileage: parseFloat(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 45000" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Type de Carrosserie</label>
                <select onChange={(e) => setFormData({...formData, car_type: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Type de Traction (Drive)</label>
                <select onChange={(e) => setFormData({...formData, drive_type: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="FWD">FWD (Avant)</option>
                  <option value="RWD">RWD (Arrière)</option>
                  <option value="AWD">AWD (4x4)</option>
                </select>
              </div>

              {/* AI PREDICTION RESULT BLOCK */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#4318FF]/5 p-6 rounded-[2rem] border-2 border-dashed border-[#4318FF]/20 flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                <div className="text-left">
                  <h4 className="text-sm font-black text-[#1B2559]">Estimation Marchande par Intelligence Artificielle</h4>
                  <p className="text-[10px] text-[#A3AED0] font-bold uppercase tracking-tight">Utilise Engine, Transmission, Mileage & Drive.</p>
                </div>
                
                {predictionResult ? (
                  <div className="bg-white px-8 py-3 rounded-2xl shadow-sm border-2 border-[#05CD99] animate-in zoom-in duration-300">
                    <span className="text-[10px] font-black text-[#A3AED0] uppercase block text-center">Valeur Suggérée</span>
                    <span className="text-2xl font-black text-[#05CD99]">{predictionResult.toLocaleString()} USD</span>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={handleAIPrediction}
                    disabled={isPredicting}
                    className="bg-[#4318FF] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3311CC] transition-all flex items-center gap-3 shadow-lg shadow-[#4318FF]/20"
                  >
                    {isPredicting ? "Analyse en cours..." : <><FaBrain size={16}/> Calculer le prix exact</>}
                  </button>
                )}
              </div>

              {/* FINAL SUBMIT BUTTONS */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-6 flex gap-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 text-[#A3AED0] font-black uppercase text-[10px]">Annuler</button>
                <button type="submit" className="flex-[2] py-4 bg-[#1B2559] text-white rounded-2xl font-black uppercase text-[10px] shadow-xl">
                  Enregistrer l'annonce
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicules;