import { createSlice } from '@reduxjs/toolkit';

// L'état initial
const initialState = {
    isAuthenticated: false, // Si l'utilisateur est connecté ou non
    token: null, // Le token JWT
    user: {
        username: '',
        firstName: '',
        lastName: ''
    }, // L'utilisateur qui veut se connecter
    errorMessage: '', // Message d'erreur (si la connexion échoue)
};

// Création du slice pour gérer l'état de l'utilisateur avec des reducers
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState,
  reducers: {
    // Action pour la connexion
    loginSuccess: (state, action) => {
        state.isAuthenticated = true; // L'utilisateur est connecté
        state.token = action.payload.token; // Sauvegarde du token
        state.user = action.payload.user; // Sauvegarde de l'utilisateur
        state.errorMessage = null; // Réinitialisation du message d'erreur
    },
    // Action pour la gestion des erreurs de connexion
    loginFailure: (state, action) => {
        state.isAuthenticated = false; // L'utilisateur n'est pas connecté
        state.errorMessage = action.payload; // En cas d'erreur de connexion
    },
    // Action pour la déconnexion
    logout: (state) => {
        state.isAuthenticated = false; // L'utilisateur est déconnecté
        state.token = null; // Réinitialisation du token
        state.user = null; // Réinitialisation de l'utilisateur
        state.errorMessage = ''; // Réinitialisation du message d'erreur
    },
    // MAJ infos utilisateur
    updateUser: (state, action) => {
        state.user = { ...state.user, ...action.payload};
    },
  },
});

// Export des actions
export const { loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;

// Export du reducer pour le store
export default authSlice.reducer;
