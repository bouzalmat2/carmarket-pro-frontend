import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Zadna FaCalendarAlt, FaShoppingCart, FaChartLine bach n-khdmo b les icons jdad
import { 
  FaCar, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaChartBar, 
  FaSignOutAlt, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaChartLine 
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  // Had l-array fih l-menu kamel kima 3ndek f l-board
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaChartBar /> },
    { name: 'Véhicules', path: '/vehicules', icon: <FaCar /> },
    { name: 'Utilisateurs', path: '/utilisateurs', icon: <FaUsers /> },
    { name: 'Réservations', path: '/reservations', icon: <FaCalendarAlt /> }, // Zadna hada
    { name: 'Facturation', path: '/factures', icon: <FaFileInvoiceDollar /> },
    { name: 'Achats', path: '/achats', icon: <FaShoppingCart /> }, // Zadna hada
    { name: 'Statistiques', path: '/stats', icon: <FaChartLine /> }, // Zadna hada
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl min-h-screen">
      <div className="p-6 text-2xl font-bold border-b border-slate-800 text-white-400 text-center">
        SmartCar Admin
      </div>
      
      <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              location.pathname === item.path 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link 
          to="/login" 
          className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-all group"
        >
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Déconnexion</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;