const Message = require("../Model/ModelMessages.js");
const projectdb = require("../database/indexDb.js");

module.exports = {
    saveMessage: async (req, res) => {
        const { userId, companyId, content, roomId } = req.body;

        // Basic validation
        if (!userId || !companyId || !content || !roomId) {
            return res.status(400).json({ message: 'User ID, content, and room ID are required' });
        }

        try {
            const message = await projectdb.Message.create({ userId, companyId, content, roomId });
            res.status(201).json(message);
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ message: 'Error saving message' });
        }
    },

    getMessages: async (req, res) => {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({ message: 'Room ID is required' });
        }

        try {
            const messages = await projectdb.Message.findAll({
                where: { roomId },
                order: [['createdAt', 'ASC']],
            });
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages' });
        }
    }
};
