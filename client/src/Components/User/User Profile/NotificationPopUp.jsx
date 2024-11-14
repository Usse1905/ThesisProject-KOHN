import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../SocketProvider';
import '../../../ComponentsCss/User/Notifications.css';  

const NotificationPopup = () => {
  const { socket } = useSocket();
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    socket?.on('newNotification', (notification) => {
      if (notification.userId === JSON.parse(localStorage.getItem('user')).id) {
        setPopupMessage(notification.message); 
        setShowPopup(true); 
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    });

    return () => {
      if (socket) {
        socket.off('newNotification');
      }
    };
  }, [socket]);

  return (
    showPopup && (
      <div className="notification-popup">
        <p>{popupMessage}</p>
      </div>
    )
  );
};

export default NotificationPopup;
