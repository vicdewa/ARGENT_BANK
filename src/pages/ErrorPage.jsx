import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/main.css';

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Page non trouvée</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <Link to="/">Retour à la page d'accueil</Link>
    </div>
  );
}

export default ErrorPage;
