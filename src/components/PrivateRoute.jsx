import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Utiliser le hook useSelector pour accéder au store et vérifier si l'utilisateur est connecté

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Accéder à l'état d'authentification

  return isAuthenticated ? element : <Navigate to="/login" />; // Si l'utilisateur est connecté, on affiche le dashboard, s'il ne l'est pas, on le redirige vers la page de login
};

export default PrivateRoute;
