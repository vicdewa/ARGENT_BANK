import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';

// Import des composants
import Nav from './components/Nav';
import Homepage from './pages/Homepage'
import Footer from './components/Footer';
import Login from './pages/Login'; 
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
        <Nav />
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Homepage />} />
          {/* Route pour la page de connexion */}
          <Route path="/login" element={<Login />} />
          {/* Route protégée pour le tableau de bord de l'utilisateur */}
          <Route path="/user" element={<UserDashboard />}/>
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
