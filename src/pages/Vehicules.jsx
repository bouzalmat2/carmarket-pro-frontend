import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGasPump, FaRoad, FaCalendarAlt, FaImage, FaCar, FaCheckCircle, FaExclamationCircle, FaBrain, FaSearchDollar, FaCogs, FaSearch } from 'react-icons/fa';
import apiRequest from '../lib/apiRequest';

const Vehicules = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // --- STATE pour la prédiction IA ---
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionError, setPredictionError] = useState(null);

  // --- Formulaire aligné sur VehicleRequestDTO ---
  const initialFormData = {
    brand: '',
    model: '',
    licensePlate: '',
    year: 2024,
    kilometrage: 0,
    fuelType: 'Essence',
    price: 0,
    available: true,
    imageUrl: '',
    // Champs supplémentaires pour la prédiction IA
    engine_size: 1.8,
    transmission: 'Automatic',
    car_type: 'Sedan',
    drive_type: 'FWD',
  };
  const [formData, setFormData] = useState(initialFormData);

  // --- Charger les véhicules depuis l'API ---
  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest.get('/vehicles');
      setCars(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des véhicules');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // --- Ouvrir le formulaire en mode édition ---
  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      licensePlate: car.licensePlate || '',
      year: car.year || 2024,
      kilometrage: car.kilometrage || 0,
      fuelType: car.fuelType || 'Essence',
      price: car.price || 0,
      available: car.available !== undefined ? car.available : true,
      imageUrl: car.imageUrl || '',
      // Champs IA avec valeurs par défaut
      engine_size: 1.8,
      transmission: 'Automatic',
      car_type: 'Sedan',
      drive_type: 'FWD',
    });
    setPredictionResult(null);
    setPredictionError(null);
    setShowForm(true);
  };

  // --- Créer ou modifier un véhicule via l'API ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { engine_size, transmission, car_type, drive_type, ...vehicleData } = formData;
      
      if (editingCar) {
        // Mode modification
        await apiRequest.put(`/vehicles/${editingCar.id}`, vehicleData);
      } else {
        // Mode création
        await apiRequest.post('/vehicles', vehicleData);
      }
      
      setShowForm(false);
      setEditingCar(null);
      setFormData(initialFormData);
      setPredictionResult(null);
      setPredictionError(null);
      fetchVehicles(); // Recharger la liste
    } catch (err) {
      alert(err.response?.data?.message || `Erreur lors de la ${editingCar ? 'modification' : 'création'} du véhicule`);
      console.error(err);
    }
  };

  // --- Supprimer un véhicule ---
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;
    try {
      await apiRequest.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
      console.error(err);
    }
  };

  // --- Vérifier les champs requis pour la prédiction ---
  const validatePredictionFields = () => {
    const missingFields = [];
    
    if (!formData.brand || formData.brand.trim() === '') missingFields.push('Marque');
    if (!formData.model || formData.model.trim() === '') missingFields.push('Modèle');
    if (!formData.year || formData.year <= 0) missingFields.push('Année');
    if (formData.kilometrage === null || formData.kilometrage === undefined || formData.kilometrage < 0) missingFields.push('Kilométrage');
    if (!formData.engine_size || formData.engine_size <= 0) missingFields.push('Cylindrée (Engine Size)');
    if (!formData.fuelType) missingFields.push('Carburant');
    if (!formData.transmission) missingFields.push('Transmission');
    if (!formData.car_type) missingFields.push('Type de Carrosserie');
    if (!formData.drive_type) missingFields.push('Type de Traction');
    
    return missingFields;
  };

  // --- Prédiction IA via Spring Boot ---
  const handleAIPrediction = async () => {
    // Vérifier les champs requis avant l'appel
    const missingFields = validatePredictionFields();
    if (missingFields.length > 0) {
      setPredictionError(`Veuillez remplir les champs suivants avant de lancer l'estimation : ${missingFields.join(', ')}`);
      setPredictionResult(null);
      return;
    }

    setIsPredicting(true);
    setPredictionError(null);
    
    try {
      const response = await apiRequest.post('/predictions', {
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        engineSize: formData.engine_size,
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        kilometrage: formData.kilometrage,
        carType: formData.car_type,
        driveType: formData.drive_type,
      });
      setPredictionResult(response.data.predictedPrice);
      setPredictionError(null);
    } catch (error) {
      console.error("Erreur prediction:", error);
      const errorMessage = error.response?.data?.message || error.message || "Erreur de connexion avec le serveur de prédiction";
      
      // Extraire les détails d'erreur de validation si disponibles
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          // Erreurs de validation Spring Boot
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          setPredictionError(`Erreurs de validation : ${validationErrors}`);
        } else {
          setPredictionError(errorMessage);
        }
      } else {
        setPredictionError(errorMessage);
      }
      setPredictionResult(null);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="p-8 space-y-10 bg-[#f4f7fe] min-h-screen font-sans">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-10 rounded-[2rem] shadow-sm flex flex-col gap-6 border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-[#1B2559] tracking-tight">Gestion des Véhicules</h1>
            <p className="text-[#A3AED0] font-bold text-sm">Gérez votre flotte et estimez les prix avec l'IA.</p>
          </div>
          <button 
            onClick={() => { setEditingCar(null); setFormData(initialFormData); setPredictionResult(null); setPredictionError(null); setShowForm(true); }}
            className="bg-[#05CD99] text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:shadow-lg transition-all font-black uppercase text-xs tracking-widest"
          >
            <FaPlus /> Ajouter un véhicule
          </button>
        </div>
        {/* Barre de recherche */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A3AED0]">
            <FaSearch className="text-sm" />
          </div>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#F4F7FE] border border-slate-200 rounded-xl text-sm font-bold text-[#1B2559] outline-none focus:ring-2 focus:ring-[#05CD99] focus:border-transparent transition-all"
            placeholder="Rechercher par plaque, marque ou modèle..."
          />
        </div>
      </div>

      {/* --- LOADING / ERROR --- */}
      {isLoading && (
        <div className="text-center py-20 text-[#A3AED0] font-bold text-lg">Chargement des véhicules...</div>
      )}
      {error && (
        <div className="text-center py-10 text-rose-500 font-bold text-sm">{error}</div>
      )}

      {/* --- CARDS GRID --- */}
      {!isLoading && cars.length === 0 && !error && (
        <div className="text-center py-20">
          <FaCar className="mx-auto text-5xl text-[#A3AED0] mb-4" />
          <p className="text-[#A3AED0] font-bold text-lg">Aucun véhicule enregistré</p>
          <p className="text-[#A3AED0] text-sm mt-1">Cliquez sur "Ajouter un véhicule" pour commencer.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars
          .filter((car) => {
            const q = search.toLowerCase();
            return (
              car.licensePlate?.toLowerCase().includes(q) ||
              car.brand?.toLowerCase().includes(q) ||
              car.model?.toLowerCase().includes(q)
            );
          })
          .map((car) => (
          <div key={car.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden">
            <div className="relative h-48 mb-6 rounded-[1.5rem] overflow-hidden bg-slate-100">
              {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#A3AED0]">
                  <FaCar size={48} />
                </div>
              )}
              {/* Badge disponibilité */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${car.available ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {car.available ? 'Disponible' : 'Indisponible'}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">{car.brand}</p>
                <h2 className="text-xl font-black text-[#1B2559] tracking-tight">{car.model}</h2>
              </div>
              <div className="flex justify-center gap-4 text-[10px] font-bold text-[#A3AED0] uppercase">
                <span className="flex items-center gap-1"><FaCalendarAlt /> {car.year}</span>
                <span className="flex items-center gap-1"><FaRoad /> {car.kilometrage?.toLocaleString()} km</span>
                <span className="flex items-center gap-1"><FaGasPump /> {car.fuelType}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-2xl font-black text-[#05CD99] tracking-tighter">{car.price?.toLocaleString()} DH</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(car)}
                    className="w-10 h-10 rounded-xl bg-blue-50 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all"
                    title="Modifier"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button 
                    onClick={() => handleDelete(car.id)}
                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all"
                    title="Supprimer"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[#A3AED0] font-bold text-center">{car.licensePlate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM --- */}
      {showForm && (
        <div className="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-[2.5rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4318FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#4318FF]/20">
                  <FaCogs />
                </div>
                <h3 className="text-xl font-black text-[#1B2559]">{editingCar ? 'Modifier le Véhicule' : 'Nouveau Véhicule'}</h3>
              </div>
              <button onClick={() => { setShowForm(false); setEditingCar(null); setFormData(initialFormData); setPredictionResult(null); setPredictionError(null); }} className="text-slate-400 hover:text-rose-500 transition-colors"><FaTimes size={20}/></button>
            </div>

            <form className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" onSubmit={handleSubmit}>
              
              {/* BRAND */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Marque *</label>
                <input type="text" required value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: Toyota" />
              </div>

              {/* MODEL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Modèle *</label>
                <input type="text" required value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: Corolla" />
              </div>

              {/* LICENSE PLATE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Immatriculation *</label>
                <input type="text" required value={formData.licensePlate} onChange={(e) => setFormData({...formData, licensePlate: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 12345-A-67" />
              </div>

              {/* YEAR */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Année</label>
                <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" />
              </div>

              {/* KILOMETRAGE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Kilométrage</label>
                <input type="number" value={formData.kilometrage} onChange={(e) => setFormData({...formData, kilometrage: parseFloat(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 45000" />
              </div>

              {/* FUEL TYPE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Carburant</label>
                <select value={formData.fuelType} onChange={(e) => setFormData({...formData, fuelType: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                </select>
              </div>

              {/* PRICE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Prix (DH) *</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 250000" />
              </div>

              {/* AVAILABLE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Disponibilité</label>
                <select value={formData.available} onChange={(e) => setFormData({...formData, available: e.target.value === 'true'})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="true">Disponible</option>
                  <option value="false">Indisponible</option>
                </select>
              </div>

              {/* IMAGE URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">URL Image</label>
                <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="https://..." />
              </div>

              {/* --- SECTION IA (champs supplémentaires pour la prédiction) --- */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <FaBrain className="text-[#4318FF]" />
                  <span className="text-[10px] font-black text-[#4318FF] uppercase tracking-widest">Paramètres pour estimation IA (optionnel)</span>
                </div>
              </div>

              {/* ENGINE SIZE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Cylindrée (Engine Size)</label>
                <input type="number" step="0.1" value={formData.engine_size} onChange={(e) => setFormData({...formData, engine_size: parseFloat(e.target.value)})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none" placeholder="Ex: 1.8" />
              </div>

              {/* TRANSMISSION */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Transmission</label>
                <select value={formData.transmission} onChange={(e) => setFormData({...formData, transmission: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Automatic">Automatique</option>
                  <option value="Manual">Manuelle</option>
                </select>
              </div>

              {/* CAR TYPE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Type de Carrosserie</label>
                <select value={formData.car_type} onChange={(e) => setFormData({...formData, car_type: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              {/* DRIVE TYPE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#A3AED0] uppercase ml-1 tracking-widest">Type de Traction</label>
                <select value={formData.drive_type} onChange={(e) => setFormData({...formData, drive_type: e.target.value})} className="w-full px-5 py-4 bg-[#F4F7FE] rounded-2xl font-bold text-[#1B2559] outline-none appearance-none">
                  <option value="FWD">FWD (Avant)</option>
                  <option value="RWD">RWD (Arrière)</option>
                  <option value="AWD">AWD (4x4)</option>
                </select>
              </div>

              {/* AI PREDICTION RESULT BLOCK */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#4318FF]/5 p-6 rounded-[2rem] border-2 border-dashed border-[#4318FF]/20 flex flex-col gap-4 mt-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <h4 className="text-sm font-black text-[#1B2559]">Estimation Marchande par Intelligence Artificielle</h4>
                    <p className="text-[10px] text-[#A3AED0] font-bold uppercase tracking-tight">Utilise Engine, Transmission, Mileage & Drive.</p>
                  </div>
                  
                  {predictionResult ? (
                    <div className="bg-white px-8 py-3 rounded-2xl shadow-sm border-2 border-[#05CD99]">
                      <span className="text-[10px] font-black text-[#A3AED0] uppercase block text-center">Valeur Suggérée</span>
                      <span className="text-2xl font-black text-[#05CD99]">{predictionResult.toLocaleString()} USD</span>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={handleAIPrediction}
                      disabled={isPredicting}
                      className="bg-[#4318FF] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3311CC] transition-all flex items-center gap-3 shadow-lg shadow-[#4318FF]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPredicting ? "Analyse en cours..." : <><FaBrain size={16}/> Calculer le prix</>}
                    </button>
                  )}
                </div>

                {/* Message d'erreur de prédiction */}
                {predictionError && (
                  <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 flex items-start gap-3">
                    <FaExclamationCircle className="text-rose-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-rose-700 mb-1">Erreur lors de l'estimation</p>
                      <p className="text-xs text-rose-600">{predictionError}</p>
                      <button
                        type="button"
                        onClick={() => setPredictionError(null)}
                        className="mt-2 text-xs text-rose-600 hover:text-rose-800 font-semibold underline"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                )}

                {/* Message de succès avec possibilité de relancer */}
                {predictionResult && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <span className="text-xs font-bold text-emerald-700">Estimation calculée avec succès</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPredictionResult(null);
                        setPredictionError(null);
                      }}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-semibold underline"
                    >
                      Recalculer
                    </button>
                  </div>
                )}
              </div>

              {/* FINAL SUBMIT BUTTONS */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-6 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => { setShowForm(false); setEditingCar(null); setFormData(initialFormData); setPredictionResult(null); setPredictionError(null); }} 
                  className="flex-1 py-4 text-[#A3AED0] font-black uppercase text-[10px]"
                >
                  Annuler
                </button>
                <button type="submit" className="flex-[2] py-4 bg-[#1B2559] text-white rounded-2xl font-black uppercase text-[10px] shadow-xl hover:bg-[#2a3a7a] transition-colors">
                  {editingCar ? 'Mettre à jour' : 'Enregistrer le véhicule'}
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
