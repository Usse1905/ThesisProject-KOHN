import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notifications, setNotifications] = useState([]);  
  const [notificationCount, setNotificationCount] = useState(JSON.parse(localStorage.getItem("notificationCount")));  
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!token || !user) {
      console.log('No token or user available, skipping WebSocket connection');
      return; // Skip socket initialization if no token or user
    }

    if (!socket) {
      console.log('Token and user available, establishing WebSocket connection');
      const newSocket = io('http://localhost:8080', {
        withCredentials: true,
        query: { token }, 
        transports: ['websocket'],
        reconnection: false,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        newSocket.emit('registerUser', user.id); // Emit user registration after socket connection
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      // Listen for 'newNotification' events from the server
      newSocket.on('newNotification', (notification) => {
        if (notification.userId === user.id) {
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
          setNotificationCount((prevCount) => {
            const updatedCount = prevCount + 1;
            localStorage.setItem('notificationCount', updatedCount.toString()); // Persist count
            return updatedCount;
          });
        }
      });

      setSocket(newSocket);

      return () => {
        if (newSocket.connected) {
          newSocket.close();
        }
      };
    }
  }, [token, socket, user]);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const markAllNotificationsAsRead = () => {
    setNotificationCount(0);
    localStorage.setItem("notificationCount", "0");
    if (socket) {
      socket.emit('markNotificationsAsRead');
    }
  };

  return (
    <SocketContext.Provider value={{ 
      socket, 
      updateToken, 
      notifications, 
      notificationCount, 
      markAllNotificationsAsRead
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
