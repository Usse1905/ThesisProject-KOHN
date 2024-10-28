import React from 'react';
import { useUser } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import "../ComponentsCss/OtherComponentsCss/NavBar.css";

const NavBar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='nav'>
            <div className="search-container">
                <input type="text" placeholder='Search cars...' />
                <button>Search</button>
            </div>
            <nav className='links'>
                <a href="/allcars">Home</a>
                <a href="/allcars">Companies</a>
                <a href="/allcars">About Us</a>
                <a href="/adminlogin">Admin</a>
            </nav>
            {user ? (
                <div className="user-avatar">
                    <div className="avatar-name">
                        <img src={user.image} className="avatar" />
                        <span className="user-name">{user.userName}</span>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="user-avatar">
                    <UserRound className="avatar" style={{color: "white"}} />
                    <a href="/login" className="login-link">Login</a>
                </div>
            )}
        </div>
    );
};

export default NavBar;
