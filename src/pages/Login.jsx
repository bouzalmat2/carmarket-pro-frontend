import React from 'react';
import { FaCarSide, FaLock, FaEnvelope } from 'react-icons/fa'; // Darouri t-installi react-icons

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
  
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 overflow-hidden relative">
        
     
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

     
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/50 mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
            <FaCarSide className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">SmartCar Admin</h2>
          <p className="text-blue-200 text-sm mt-2">Bienvenue! Connectez-vous pour gérer votre flotte.</p>
        </div>

        
        <form className="space-y-6">
          <div className="relative">
            <label className="text-xs font-semibold text-blue-200 uppercase tracking-wider ml-1">Email Business</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope className="text-sm" />
              </div>
              <input 
                type="email" 
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
                placeholder="admin@smartcar.ma"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-blue-200 uppercase tracking-wider ml-1">Mot de passe</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock className="text-sm" />
              </div>
              <input 
                type="password" 
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transform active:scale-[0.98] transition-all duration-200"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; 2026 SmartCar Systems. Tous droits réservés.
        </div>
      </div>
    </div>
  );
};

export default Login;