const Message = require("../Model/ModelMessages.js");
const projectdb = require("../database/indexDb.js");
const {broadcastMessage} = require("../SocketManager.js")

const GLOBAL_ROOM_ID = 'global-chat-room';  // Fixed room ID for the global chat

module.exports = {
    // Controller - saveMessage
    saveMessage: async (req, res) => {
        const { userId, companyId, content } = req.body;  // Removed companyId, using global room

        // Basic validation
        if (!userId || !content || !companyId) {
            return res.status(400).json({ message: 'User ID and content are required' });
        }

        try {
            // Save the message to the database, using the global room ID
            const message = await projectdb.Message.create({
                userId, 
                companyId,
                content, 
                roomId: GLOBAL_ROOM_ID  // Use the global room ID
            });

            // Emit message to the global room using Socket.IO
            // Assume broadcastMessage is a function you export from SocketManager.js
            // broadcastMessage(GLOBAL_ROOM_ID, {
            //     userId,
            //     content,
            //     roomId: GLOBAL_ROOM_ID,
            //     timestamp: new Date().toISOString(),
            // });

            // Respond with the saved message
            res.status(201).json(message);
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ message: 'Error saving message' });
        }
    },

    // Controller - getMessages
    getMessages: async (req, res) => {
        const { roomId } = req.params;

        // Ensure we are fetching messages from the global room
        if (roomId !== GLOBAL_ROOM_ID) {
            return res.status(400).json({ message: `Only the '${GLOBAL_ROOM_ID}' room is allowed` });
        }

        try {
            const messages = await projectdb.Message.findAll({
                where: { roomId },
                order: [['createdAt', 'ASC']],  // Ensure messages are ordered by creation time
            });
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages' });
        }
    }
};
