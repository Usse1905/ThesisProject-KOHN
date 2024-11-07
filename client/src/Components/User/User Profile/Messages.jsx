import React from 'react';
import moment from 'moment';
import '../../../ComponentsCss/User/Messages.css'; 

const Messages = ({ messages }) => (
    <div className="messages-container">
        {messages.length === 0 ? (
            <p className="no-messages">No messages found for this room.</p>
        ) : (
            messages.map((msg, index) => (
                <div key={index} className={`message ${msg.userId === 'currentUser' ? 'sent' : 'received'}`}>
                    <div className="message-bubble">
                        <p className="message-content"><strong>{msg.userId}</strong>: {msg.content}</p>
                        <p className="message-time">{moment(msg.createdAt).format('HH:mm')}</p>
                    </div>
                </div>
            ))
        )}
    </div>
);

export default Messages;
