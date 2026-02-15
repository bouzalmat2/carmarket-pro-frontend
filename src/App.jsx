import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Vehicules from './pages/Vehicules';
import Facturation from './pages/Facturation';
import Utilisateurs from './pages/Utilisateurs';
import Dashboard from './pages/Dashboard';
import Achats from './pages/Achats';
import Statistiques from './pages/Statistiques';
import Reservations from './pages/Reservations';

function App() {
  

  return (
   <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
       
        <Route path="/" element={<div className="p-10 text-center">Hadi hiya Home Page / Dashboard</div>} />

        /* Pages dyal l-Admin m-rbtin b l-Sidebar */
        <Route path="/" element={<AdminLayout />}>
          <Route path="vehicules" element={<Vehicules />} />
          <Route path="factures" element={<Facturation />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route index element={<Dashboard />} />
          <Route path="achats" element={<Achats />} />
          <Route path="/stats" element={<Statistiques />} />
          <Route path="/reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
