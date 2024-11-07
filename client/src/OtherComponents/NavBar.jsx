import React, { useEffect, useRef } from 'react';
import { useUser } from '../UserProvider';
import { useCompany } from '../CompanyProvider'; // Assuming you have a useCompany hook
import { useNavigate } from 'react-router-dom';
import { UserRound, Bell, MessageCircle, LogOut } from 'lucide-react';
import io from 'socket.io-client';
import Mylogo from "../../../client/logo.png";
import "../ComponentsCss/OtherComponentsCss/NavBar.css";

const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }); // Your backend socket server URL

const NavBar = () => {
    const { user, notificationCount, updateNotifications } = useUser();
    const { company } = useCompany(); // Assuming `company` is the object you get from `useCompany`
    const navigate = useNavigate();
    const isMounted = useRef(true);

    // Listen for new notification events for the user
    useEffect(() => {
        if (user) {
            socket.on('newNotification', (data) => {
                if (data.userId === user.id) {
                    updateNotifications((prevCount) => prevCount + data.newNotificationCount);
                }
            });
        }

        return () => {
            if (isMounted.current) {
                socket.off('newNotification');
            }
        };
    }, [user, updateNotifications]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('company'); // Clear company info if it's logged out
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
            ) : company ? (
                <div className="company-avatar">
                    <div className="company-name" onClick={() => navigate("/companyprofile")}>
                        {company.name}
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
