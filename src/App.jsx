import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Vehicules from './pages/Vehicules';
import Facturation from './pages/Facturation';
import Utilisateurs from './pages/Utilisateurs';
import Dashboard from './pages/Dashboard';
import Achats from './pages/Achats';
import Statistiques from './pages/Statistiques';
import Reservations from './pages/Reservations';


const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />

   
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="vehicules" element={<Vehicules />} />
          <Route path="factures" element={<Facturation />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route path="achats" element={<Achats />} />
          <Route path="stats" element={<Statistiques />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>

        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;