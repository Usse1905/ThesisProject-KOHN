import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../SocketProvider';
import { useCompany } from '../../../CompanyProvider';
import moment from 'moment';
import axios from 'axios';
import '../../../ComponentsCss/User/Messages.css'; 

const GLOBAL_ROOM_ID = 'global-chat-room';  

const Messages = ({ messages, setMessages, companyId }) => {
    
    const [messageContent, setMessageContent] = useState("");  // State for the input message
    const {socket}= useSocket()
    const {company} = useCompany()
   
    // Fetch messages initially
    const handleGetMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/chat/messages/global-chat-room');
            console.log("Fetched messages:", response.data);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Handle receiving a new message via socket
    const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Send message to the server (which will then broadcast to the global chat room)
    const handleSendMessage = () => {
        if (messageContent.trim()) {
            socket.emit('sendMessage', {
                userId: 1,
                companyId:companyId,
                content: messageContent,
            });
            setMessageContent('');  // Clear the input after sending
        }
    };

    // Set up socket listener when the component mounts
    useEffect(() => {
        // Join the global room
        socket.on('joinRoom', { companyId: companyId });

        // Listen for new messages in the global chat room
        socket.on('receiveMessage', handleNewMessage);


        // Clean up on component unmount
        return () => {
            socket.off('receiveMessage', handleNewMessage);
        };
    }, [companyId]);

    // Fetch messages when the component mounts
    useEffect(() => {
        handleGetMessages();
    }, []);

    return (
        <div className="messages-container">
            {messages.length === 0 ? (
                <p className="no-messages">No messages found for this room.</p>
            ) : (
                messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.companyId === companyId ? 'sent' : 'received'}`}
                    >
                        <div className="message-bubble">
                            <p className="message-content">
                                 {msg.content}
                            </p>
                            <p className="message-time">{moment(msg.createdAt).format('HH:mm')}</p>
                        </div>
                    </div>
                ))
            )}

            {/* Message input */}
            <div className="message-input-container">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Messages;
