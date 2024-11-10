
let io;

const setSocketIO = (socketIOInstance) => {
  io = socketIOInstance;
};

// Emit notification (unchanged)
const emitNotification = (userId, companyId, newNotificationCount) => {
  if (io) {
    io.emit('newNotification', { userId, companyId, newNotificationCount });
  } else {
    console.error('Socket.io instance is not initialized')
  }
};

// Broadcast message to a specific room (company or user)
const broadcastMessage = (roomId, message) => {
  // Broadcast the message to everyone in the global room
  io.to(roomId).emit('receiveMessage', message);
};

module.exports = { setSocketIO, emitNotification, broadcastMessage };
