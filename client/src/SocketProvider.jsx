import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check if token exists before establishing the socket connection
    if (!token) {
      console.log('No token available, skipping WebSocket connection');
      return; // No token, so we do nothing here
    }

    console.log('Token available, establishing WebSocket connection');
    
    const newSocket = io('http://localhost:8080', {
      withCredentials: true,
      extraHeaders: { "X-Auth-Token": token},
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    // Cleanup function to close socket on component unmount
    return () => {
      if (newSocket.connected) {
        newSocket.close();    
      }
    };
  }, [token]); // Re-run when the token changes

  const updateToken = (newToken) => {
    console.log('Updating token:', newToken);
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <SocketContext.Provider value={{ socket, updateToken }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
