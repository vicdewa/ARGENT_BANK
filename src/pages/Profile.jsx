import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import '../../css/main.css';
import Account from '../components/Account'; 
import { Navigate } from 'react-router-dom';
import { GET_USERPROFILE } from '../redux/actions/typeActions';
import { updateUsername } from "../redux/actions/userActions";

function Profile() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user); // userData provient de Redux
    const isConnected = useSelector((state) => state.auth.isConnected);
    console.log('userData dans userDashboard', userData);

// Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
    if (!isConnected) {
        return <Navigate to="/login" />;
    }

// Ajout d'un effet pour récupérer les données utilisateur depuis l'API dès que le composant se charge
    useEffect(() => {
        if (isConnected) {
            const fetchUserProfile = async () => {
                try {
                    const token = localStorage.getItem('authToken');
                    console.log('Token récupéré :', token);
                    console.log('User info formulaire', userInfo);
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Profil utilisateur récupéré', data);
                // On dispatch l'action avec les données récupérées
                    dispatch({
                        type: GET_USERPROFILE,
                        payload: {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                    });
                // Envoi des données utilisateur dans Redux
                } else {
                    console.error('Erreur lors de la récupération des informations utilisateur');
                }
                } catch (error) {
                    console.error('Erreur de récupération du profil utilisateur', error);
                }
            };
        // Appel de la fonction pour récupérer le profil utilisateur
            fetchUserProfile(); 
        }
    }, [isConnected, dispatch]);

// Initialisation de `userInfo` avec `userData` une fois que les données sont disponibles
    const [userInfo, setUserInfo] = useState({
        username: userData?.username || '',
        firstName: userData?.firstname || '', 
        lastName: userData?.lastname || '',
    });

// Mise à jour des informations utilisateur dans `userInfo` si `userData` change. Exécutée après que userData ait été récupéré et mis à jour dans le store Redux.
    useEffect(() => {
        if (userData) {
            setUserInfo({
                username: '',
                firstName: userData.firstname || '',
                lastName: userData.lastname || '',
            });
        }
    }, [userData]);

// Gestion de l'état d'édition (quand l'utilisateur modifie ses infos)
    const [isEditing, setIsEditing] = useState(false);
// Gestion du clic sur "Edit"
    const handleEditClick = () => {
        console.log('Clic sur Edit');
        // Le formulaire s'affiche
        setIsEditing(true); 
    };
// Gestion du changement de valeur dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            // MAJ de l'info correspondante dans le state
            [name]: value, 
        }));
    };

// Gestion de la sauvegarde des modifications du profil utilisateur
    const handleSave = async () => {
        try {
            // Récupération du token pour "autoriser" l'action de modification
            const authToken = localStorage.getItem('authToken'); 
            console.log('Token récupéré', authToken);
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({userName:userInfo.username || ''}),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Infos mises à jour', data);
                // Vérification de la donnée récupérée
                console.log("UserName récupéré:", data.body.userName); 
                //MAJ de l'utilisateur dans Redux avec une action
                dispatch(updateUsername(data.body.userName)); 
                // Réinitialisation des champs
                setUserInfo({
                    username: '',
                });
                // Le formulaire se masque après la MAJ
                setIsEditing(false); 
            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la sauvegarde', errorData);
            }
            } catch (error) {
                console.error('Erreur de connexion', error);
        }
    };

// Gestion de l'annulation de la modification
    const handleCancel = () => {
        setUserInfo({
            username: '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
        });
        // Le formulaire se masque
        setIsEditing(false); 
    };

    return (
        <>
            <main className="main bg-dark">
                <div className="header">
                    {!isEditing ? (
                        <>
                            <h1 className="h1-welcome">Welcome back<br />{userData.firstname} {userData.lastname}!</h1>
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
                                        value={userData.firstname}
                                        disabled // Lecture seule 
                                        readOnly
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="lastName">Last name: </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={userData.lastname}
                                        disabled // Lecture seule
                                        readOnly
                                    />
                                </div>
                                <button type="button" className="save-button" onClick={handleSave}>Save</button>
                                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>

                <h2 className="sr-only">Accounts</h2>
{/* Utilisation du composant Account pour chacun des comptes */}
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

export default Profile;