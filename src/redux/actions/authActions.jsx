import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./typeActions";

/* ACTIONS D'AUTHENTIFICATION */

// Action pour la connexion réussie
export const loginSuccess = (token) => {
    return {
        // Type d'action: LOGIN_SUCCESS
        type: LOGIN_SUCCESS, 
        // Token en tant que charge utile
        payload: token, 
    }
}

// Action pour la connexion échouée
export const loginFailed = (error) => {
    return {
        // Type d'action: LOGIN_FAIL
        type: LOGIN_FAIL, 
        // Erreur en tant que charge utile
        payload: error, 
    }
}

// Action pour la déconnexion
export const logoutUser = () => {
    return (dispatch) => {
        // Retrait du token du localStorage
        localStorage.removeItem('authToken');
        // Dispatch de l'action logout pour réinitialiser l'état de l'authentification
        dispatch({
            type: LOGOUT,
        });
    };
}