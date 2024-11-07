const express = require("express");
const cors = require('cors');
const http = require('http'); // Import http module
const jwt = require('jsonwebtoken');
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
const { setSocketIO,broadcastMessage  } = require("../server/SocketManager.js");

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
      allowedHeaders: ["Content-Type","Authorization"],
      credentials: true, // Allow credentials (cookies, etc.) if needed
    },
    transports: ['websocket', 'polling']
  });

  setSocketIO(io);

  io.use((socket, next) => {
    const token = socket.handshake.headers['authorization']; // Grab the token from the header
  
    if (!token) {
      return next(new Error('Authentication error')); // If no token is found, deny connection
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error')); // If JWT is invalid, deny connection
      }
  
      socket.userId = decoded.id;  // Add decoded user info to socket object
      next();  // Proceed to the connection
    });
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join the global chat room
    socket.on('joinRoom', ({ userId }) => {
        socket.join('global-chat-room');  // Join the global room
        console.log(`User ${userId} joined the global chat room.`);
    });

    // Listen for new messages and broadcast them
    socket.on('sendMessage', async ({ userId, content }) => {
        const messageData = {
            userId,
            content,
            roomId: 'global-chat-room',  // Use the global room ID
            timestamp: new Date().toISOString(),
        };

        try {
            // Save the message to the database (you could use the controller's `saveMessage` function)
            const message = await projectdb.Message.create(messageData);

            // Emit the message to the room (broadcasting to everyone in the room)
            broadcastMessage('global-chat-room', message);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Clean up when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('A user disconnected. Reason:', reason);
    });
  
    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });
});


server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = { io };
