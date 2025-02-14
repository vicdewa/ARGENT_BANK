import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailed } from '../redux/actions/authActions';
import '../../css/main.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Pour rediriger après la connexion
  const dispatch = useDispatch(); // Pour envoyer des actions Redux

// Gérer le changement dans les champs du formulaire
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRememberChange = (e) => setRememberMe(e.target.checked);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        setErrorMessage('Merci de renseigner vos email et mot de passe');
        return;
    } 
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password,}),
      });
    
    if (response.ok) {
        const data = await response.json();
            console.log('Réponse de l\'API:', data);
        const token = data.body?.token;
        if (token){
            localStorage.setItem('authToken', token);

        // Dispatch de l'action pour enregistrer l'utilisateur dans Redux
        dispatch(loginSuccess({
            token: token, // La réponse de l'API contient un token
            user: data.user, // La réponse de l'API contient les données utilisateur
        })); 
        console.log("Token enregistré", localStorage.getItem('authToken'));
        console.log("Redirection vers la page '/user' après connexion");
        console.log(data.user);
        navigate('/user');
    }
    } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Identifiants incorrects');
        dispatch(loginFailed(errorData.message || 'Identifiants incorrects'));
    }
} catch (error) {
    console.error('Erreur lors de la connexion', error);
    setErrorMessage('Erreur de connexion. Veuillez réessayer plus tard.');
    dispatch(loginFailed('Erreur de connexion. Veuillez réessayer plus tard'));
}
  };

  return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberChange}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* Utilisation d'un bouton React pour gérer la soumission */}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
  );
}

export default Login;
