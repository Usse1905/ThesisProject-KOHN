const setSocketIO = (socketIOInstance) => {
  io = socketIOInstance;
};

const emitNotification = (userId, newNotificationCount) => {
  if (io) {
    io.emit('newNotification', { userId, newNotificationCount });
  } else {
    console.error('Socket.io instance is not initialized');
  }
};

module.exports = { setSocketIO, emitNotification };