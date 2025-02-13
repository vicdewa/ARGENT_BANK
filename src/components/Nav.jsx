import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/main.css';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {
// Récupération de l'état de l'utilisateur connecté depuis Redux
const { isAuthenticated, user } = useSelector((state) => state.auth);
// Gestion de la déconnexion
const dispatch = useDispatch();
const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
};
    return (
        <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src="/img/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            {isAuthenticated? (
            <div className="user-info">
                <span className="username">{user?.username}</span>
                <i 
                    className="fa-solid fa-right-from-bracket logout-btn"
                    onClick={handleLogout}
                    >
                        Logout
                </i>
            </div>
           ) : (
            <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
            </Link>
            )}
        </div>
        </nav>
    );
};

export default Nav;
