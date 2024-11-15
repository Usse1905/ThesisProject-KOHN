import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../UserProvider';
import { useCompany } from '../CompanyProvider';
import { useNavigate } from 'react-router-dom';
import { UserRound, Bell, MessageCircle, LogOut } from 'lucide-react';
import { useSocket } from '../SocketProvider';
import Mylogo from "../../../client/logo.png";
import "../ComponentsCss/OtherComponentsCss/NavBar.css";

const NavBar = () => {
  const { socket, markAllNotificationsAsRead, notificationCount,setNotificationCount, messageCount, setMessageCount, markMessagesAsRead } = useSocket();  
  const { user } = useUser();
  const { company } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCountn = localStorage.getItem("notificationCount");
      const storedCountm = localStorage.getItem("messageCount");
      if (storedCountn !== null) {
        setNotificationCount(parseInt(storedCountn, 10)); // Update state from localStorage
      }
      if (storedCountm !== null) {
        setMessageCount(parseInt(storedCountm, 10)); // Update state from localStorage
      }
    };

    // Set up a listener for localStorage changes
    window.addEventListener('storage', handleStorageChange);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    // localStorage.setItem("notificationCount", "0");
    navigate('/login');
  };

  const handleBellClick = () => {
    localStorage.setItem("notificationCount", 0);
    markAllNotificationsAsRead()
    navigate('/userprofile'); 
  };

  const handleMessageClick = () => {
    localStorage.setItem("messageCount", 0);
    markMessagesAsRead()
    navigate('/userprofile'); 
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
        <a href="/allcompanies">Companies</a>
        <a href="/AboutUs">About Us</a>
        <a href="/adminlogin">Admin</a>
      </nav>

      {user ? (
        <div className="user-avatar">
          <div className="user-part">
            <div className="avatar-container">
              <img src={user.image} className="avatar" onClick={() => navigate("/userprofile")} />
            </div>
            <div className="user-name">{user.userName}</div>
          </div>
          <div className='nav-icons'>
            <div className="bell-container" onClick={handleBellClick}>
              <Bell size={30} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span> 
              )}
            </div>
            <div className="message-container" onClick={handleMessageClick} style={{backgroundColor:"#333"
            }}>
              <MessageCircle size={30} />
              {messageCount > 0 && (
                <span className="message-badge" >{messageCount}</span> 
              )}
            </div>
          </div>
          
          <div className="logout-container" onClick={handleLogout}>
            <LogOut />
            <span>Logout</span>
          </div>
        </div>
      ) : company ? (
        <div className="company-avatar">
          <div className="company-name" onClick={() => navigate("/Company/Profile")}>
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
