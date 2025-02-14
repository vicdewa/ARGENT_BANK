import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer.jsx';
import { userReducer } from './reducers/userReducer.jsx';

// Combinaison des réducteurs en un réducteur racine
const rootReducer = combineReducers({
   auth: authReducer, // Réducteur d'authentification
   user: userReducer, // Réducteur d'utilisateur
})

// Configuration du magasin Redux
const store = configureStore({
    reducer: rootReducer, // Réducteur racine
    devTools: true // Activation des outils de développement Redux
})

export default store;