import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import du reducer d'authentification

// Configuration du store
const store = configureStore({
  reducer: {
    auth: authReducer, // Le reducer d'authentification
  },
});

export default store;
