const express = require("express");
const cors = require('cors');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io
const projectdb = require("./database/indexDb.js");
const UserRoutes = require("./Routes/UserRoutes.js");
const CarRoutes = require("./Routes/CarRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const signupCompanyRoutes = require("./Routes/signupCompayRoutes.js");
const AdminRoutes = require("./Routes/AdminRoutes.js");
const UserReqRoutes = require("./Routes/UserRequestsRoutes.js");
const uploadRoutes = require("./Routes/UploadRoutes.js");
const messageRoutes = require("./Routes/MessagesRoutes.js");
const { setSocketIO } = require("../server/SocketManager.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow your React app's origin
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials (cookies, etc.) if needed
  }));

app.use("/cars", CarRoutes);
app.use("/company", CompanyRoutes);
app.use("/api", UserRoutes);
app.use("/api", signupCompanyRoutes);
app.use("/Admin", AdminRoutes);
app.use("/api", UserReqRoutes);
app.use("/api", uploadRoutes);
app.use("/chat", messageRoutes);
app.use(express.static(__dirname + '../react-client/indexFront.jsx')); // Adjust this path as needed

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", // Allow your React app's origin
      methods: ["GET", "POST","PUT","DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true, // Allow credentials (cookies, etc.) if needed
    }
  });

  setSocketIO(io);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ userId, companyId }) => {
      socket.join(companyId);
      console.log(`User ${userId} joined room ${companyId}`);
  });

  socket.on('sendMessage', async ({ userId, content, companyId }) => {
      const roomId = companyId; // Using companyId as the roomId
      const messageData = { userId, content, roomId };

      try {
          // Save the message to the database
          const message = await projectdb.Message.create(messageData);
          // Emit the message to the room
          io.to(companyId).emit('receiveMessage', message);
      } catch (error) {
          console.error('Error saving message:', error);
      }
  });

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = { io };
