import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080', {
  transports: ['websocket'], // Force WebSocket transport (not polling)
});

const WebSocketTest = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    socket.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Test</h1>
    </div>
  );
};

export default WebSocketTest;
