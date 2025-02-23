import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/typeActions";

// État initial de l'authentification 
const initialState = {
    status: "VOID", 
    isConnected: false, 
    token: null, 
    error: null, 
}

/*Ce code est un "reducer" Redux qui gère les actions d'authentification. Selon le type d'action, il met à jour le statut, le statut de connexion, le token et l'erreur dans l'état. Si le type d'action n'est pas reconnu, 
il renvoie l'état actuel.*/
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED", // Mise à jour du statut: "SUCCEEDED"
                isConnected: true, // Mise à jour de la connexion à true
                token: action.payload, // Mise à jour du token avec la charge utile de l'action
                error: null, // Réinitialisation de l'erreur à null
            }
        
        case LOGIN_FAIL: {
            return {
                ...state,
                status: "FAILED", // Mise à jour du statut: "FAILED"
                isConnected: false, // Mise à jour de la connexion à false
                error: action.payload, // Mise à jour de l'erreur avec la charge utile de l'action
            }
        }   
        case LOGOUT: {
            return initialState; // Réinitialisation de l'état à l'état initial
        }   
        default:
            return state;
    }
}