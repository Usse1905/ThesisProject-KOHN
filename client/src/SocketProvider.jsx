import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notifications, setNotifications] = useState([]);  
  const [notificationCount, setNotificationCount] = useState(JSON.parse(localStorage.getItem("notificationCount")));  
  const [messageCount, setMessageCount] = useState(JSON.parse(localStorage.getItem("messageCount")));
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const company = JSON.parse(localStorage.getItem("company")) || null;

  useEffect(() => {
    // Don't try to connect if no token, user, or company is available
    if (!token || (!user && !company)) {
      console.log('No token or user/company available, skipping WebSocket connection');
      return;
    }

    // Check if a socket connection is already established
    if (!socket) {
      console.log('Token and user/company available, establishing WebSocket connection');
      const newSocket = io('http://localhost:8080', {
        withCredentials: true,
        query: { token },
        transports: ['websocket'],
        reconnection: true,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        // Register either the user or company based on available data
        newSocket.emit('registerUser', {
          userId: user?.id,
          companyId: company?.id
        });
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      // Listen for 'newNotification' events from the server
      newSocket.on('newNotification', (notification) => {
        if (notification.userId === user?.id || notification.companyId === company?.id) {
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
          setNotificationCount((prevCount) => {
            const updatedCount = prevCount + 1;
            localStorage.setItem('notificationCount', updatedCount.toString()); // Persist count
            return updatedCount;
          });
        }
      });

      // Listen for new messages
      newSocket.on('receiveMessage', (message) => {
        if (message.roomId === 'global-chat-room') {
          setMessageCount((prevCount) => {
            const updatedCount = prevCount + 1;
            localStorage.setItem('messageCount', updatedCount.toString()); // Persist count
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
  }, [token, socket, user, company]); // Dependency array: only re-run if token, user, or company changes

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

  const markMessagesAsRead = () => {
    setMessageCount(0); 
    localStorage.setItem("messageCount", "0");
  };

  return (
    <SocketContext.Provider value={{ 
      socket, 
      updateToken, 
      notifications, 
      notificationCount, 
      messageCount,
      setMessageCount,
      setNotificationCount,
      markMessagesAsRead,
      markAllNotificationsAsRead
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
