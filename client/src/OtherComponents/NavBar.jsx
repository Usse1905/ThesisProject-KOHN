import React, { useEffect, useRef } from 'react';
import { useUser } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, LogOut } from 'lucide-react';
import io from 'socket.io-client';
import Mylogo from "../../../client/logo.png";
import "../ComponentsCss/OtherComponentsCss/NavBar.css";

const socket = io('http://localhost:8080'); // Your backend socket server URL

const NavBar = () => {
    const { user, notificationCount, updateNotifications } = useUser();
    const navigate = useNavigate();
    const isMounted = useRef(true);
    // Listen for new notification events
    useEffect(() => {
        // This ref tracks the current user so we can clean up on user change
        if (user) {
            socket.on('newNotification', (data) => {
                if (data.userId === user.id) {
                    // Update the notification count when a new notification arrives
                    updateNotifications((prevCount) => prevCount + data.newNotificationCount);
                }
            });
        }
    
        // Clean up the socket listener only when the user changes
        return () => {
            if (isMounted.current) {
                // If the component is mounted, we clean up on user change
                socket.off('newNotification');
            }
        };
    }, [user, updateNotifications])

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='nav'>
            <div className='logo-div'>
                <img src={Mylogo} alt="logo" />
            </div>
            <div className="search-container">
                <input className="search-input" type="text" placeholder='Search cars...' />
                <button className='search-button'>Search</button>
            </div>
            <nav className='links'>
                <a href="/allcars">Cars</a>
                <a href="/allcars">Companies</a>
                <a href="/allcars">About Us</a>
                <a href="/adminlogin">Admin</a>
            </nav>
            {user ? (
                <div className="user-avatar">
                    <div className='nav-icons'>
                        <div className="bell-container">
                            <Bell size={24} />
                            {notificationCount > 0 && (
                                <span className="notification-badge">{notificationCount}</span>
                            )}
                        </div>
                        <MessageCircle />
                    </div>
                    <div className="user-part">
                        <div className="avatar-container">
                            <img src={user.image} className="avatar" onClick={() => navigate("/userprofile")} />
                        </div>
                        <div className="user-name">{user.userName}</div>
                    </div>
                    
                    <div className="logout-container" onClick={handleLogout}>
                        <LogOut />
                        <span>Logout</span>
                    </div>
                </div>
            ) : (
                <div className="user-avatar">
                    <UserRound className="avatar" style={{ color: "white" }} onClick={() => navigate("/login")} />
                    <a href="/login" className="login-link">Login</a>
                </div>
            )}
        </div>
    );
};

export default NavBar;
