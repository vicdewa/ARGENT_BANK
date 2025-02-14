import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/main.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions'

const Nav = () => {
// Récupération de l'état de l'utilisateur connecté depuis Redux
const { isConnected } = useSelector((state) => state.auth);
const { userData } = useSelector ((state) => state.user);
const dispatch = useDispatch();
const navigate = useNavigate();

// Gestion de la déconnexion
const handleLogout = () => {
    dispatch(logoutUser()); // Appel de l'action logoutUser 
    navigate('/'); // Redirection Homepage après logout
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
            {isConnected? (
            <div className="user-info">
                <Link className="username" to="user">
                    {userData?.firstname}
                </Link>
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
