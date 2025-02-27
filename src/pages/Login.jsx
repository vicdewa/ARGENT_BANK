import React, { useState } from 'react';
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

// Gestion du changement dans les champs du formulaire
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    //const handleRememberChange = (e) => setRememberMe(e.target.checked);

// Gestion de la soumission du formulaire
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
                // Enregistrement des données utilisateur
                localStorage.setItem('user', JSON.stringify(data.user));  
        // Dispatch de l'action pour enregistrer l'utilisateur dans Redux
        dispatch(loginSuccess({
            token: token, // La réponse de l'API contient un token
            user: data.user, // La réponse de l'API contient les données utilisateur
        })); 
            console.log("Token enregistré", localStorage.getItem('authToken'));
            console.log("Redirection vers la page '/profile' après connexion");
            console.log(data.user);
        navigate('/profile');
        }
        } else {
            const errorData = await response.json();
        // Gestion des erreurs
        let errorMsg='';
            if(response.status === 400){
                errorMsg='Identifiants incorrects.'
            } else if (response.status === 500){
                errorMsg='Erreur du serveur. Veuillez réessayer plus tard'
            } else if (errorData.message === 'User not found'){
                errorMsg= 'Aucun utilisateur trouvé avec cet email'
            } else {
                errorMsg= errorData.message || 'Erreur inconnue. Veuillez réessayer'
            }
            setErrorMessage(errorMsg);
            dispatch(loginFailed(errorMsg));
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
                <i className="fa fa-user-circle sign-in-icon" aria-label="icône de connexion"></i>
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
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                            id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        //onChange={handleRememberChange}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>

                {/* Utilisation d'un bouton pour gérer la soumission */}
                <button type="submit" className="sign-in-button" aria-label="Se connecter">
                    Sign In
                </button>
            </form>
            </section>
        </main>
    );
    }

export default Login;