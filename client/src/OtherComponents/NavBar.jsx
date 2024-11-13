// src/OtherComponents/NavBar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import { UserRound } from 'lucide-react';
import "../ComponentsCss/OtherComponentsCss/NavBar.css";

const NavBar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => setIsAuthenticated(!!localStorage.getItem('token'));
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleAuthButtonClick = () => {
        if (isAuthenticated) {
            localStorage.removeItem('token'); // Remove token on logout
            setIsAuthenticated(false);        // Update state
            setUser(null);                    // Clear user context if needed
            navigate('/login');               // Redirect to login
        } else {
            navigate('/login');               // Redirect to login if not logged in
        }
    };

    return (
        <div className='nav'>
            <div className="search-container">
                <input className="search-input" type="text" placeholder='Search cars...' />
                <button className='search-button'>Search</button>
            </div>
            <nav className='links'>
                <a href="/allcars">Home</a>
                <a href="/allcars">Companies</a>
                <a href="/allcars">About Us</a>
                <a href="/adminlogin">Admin</a>
            </nav>
            {isAuthenticated ? (
                <div className="user-avatar">
                    {user && (
                        <div className="avatar-name">
                            <img src={user.image} className="avatar" alt="User Avatar" />
                            <span className="user-name">{user.userName}</span>
                        </div>
                    )}
                    <button onClick={handleAuthButtonClick}>Logout</button>
                </div>
            ) : (
                <div className="user-avatar">
                    <UserRound className="avatar" style={{ color: "white" }} />
                    <a onClick={handleAuthButtonClick} className="login-link">Login</a>
                </div>
            )}
        </div>
    );
};

export default NavBar;
