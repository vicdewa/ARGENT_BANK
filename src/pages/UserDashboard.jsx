import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice"; // Action redux pour MAJ infos utilisateur
import '../../css/main.css';
import Account from '../components/Account'; 

function UserDashboard() {
    const dispatch = useDispatch();
// Récupération des infos de l'utilisateur depuis Redux
    const { user, isAuthenticated } = useSelector((state) => state.auth);
// Gestion de l'état d'édition (quand l'utilisateur modifie ses infos)
    const [isEditing, setIsEditing] = useState(false);
// Gestion des infos modifiables du formulaire
    const [userInfo, setUserInfo] = useState({
        username: user?.username || '',
        firstName: user?.firstname || '',
        lastName: user?.lastName || '',
    });

// MAJ du nom de l'utilisateur sans rechargement de la page
useEffect(() => {
    console.log("user dans useEffect:", user);
    if (user && user.username){
        setUserInfo({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastName
        });
    }
}, [user]);

// Gestion du clic sur "Edit"
const handleEditClick = () => {
    console.log('Clic sur Edit');
    setIsEditing(true); // Le formulaire s'affiche
};

// Gestion du changement de valeur dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value, // MAJ de l'info correspondante dans le state
        }));
    };
// Gestion de la sauvegarde des modifications du profil utilisateur
    const handleSave = async () => {
        try{
            const authToken = localStorage.getItem('authToken'); // Récupérer le token pour "autoriser" l'action de modification
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(userInfo),
            });
        if (response.ok) {
            const data = await response.json();
            console.log('Infos mises à jour', data);
        // MAJ du store avec une action Redux
            dispatch(updateUser(data.user)); 
            setIsEditing(false); // Le formulaire se masque après la MAJ
        } else {
            console.error('Erreur lors de la sauvegarde');
        }
        } catch (error) {
            console.error('Erreur de connexion', error);
        }
    };
// Gestion de l'annulation de modification
    const handleCancel = () => {
        setIsEditing(false); // Formulaire masqué
    };
    
    if (!isAuthenticated) {
        return <p>Veuillez vous connecter pour accéder au tableau de bord.</p>
    }

    return (
    <>
      <main className="main bg-dark">
        <div className="header">
            {!isEditing ? (
                <>
                <h1>Welcome back<br />{user?.username}!</h1>
                <button 
                    className="edit-button" 
                    onClick={handleEditClick}>Edit Name
                </button>
                </>
            ) : (
            <div className="edit-form">
                <h1>Edit user info</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">User name: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userInfo.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                  <label htmlFor="firstName">First name: </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">Last name: </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="button" className="save-button" onClick={handleSave}>Save</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
              </form>
            </div>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        {/* Utilisation du composant Account pour chaque compte */}
        <Account 
          title="Argent Bank Checking (x8349)" 
          balance="$2,082.79" 
          description="Available Balance"
        />
        <Account 
          title="Argent Bank Savings (x6712)" 
          balance="$10,928.42" 
          description="Available Balance"
        />
        <Account 
          title="Argent Bank Credit Card (x8349)" 
          balance="$184.30" 
          description="Current Balance"
        />
      </main>
    </>
  );
}

export default UserDashboard;
