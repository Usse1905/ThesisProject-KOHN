import React from 'react';
import moment from 'moment';

const Messages = ({ messages }) => (
    <div>
        {messages.length === 0 ? (
            <p>No messages found for this room.</p>
        ) : (
            messages.map((msg, index) => (
                <div key={index} className="message">
                    <p><strong>{msg.userId}</strong>: {msg.content}</p>
                    <p className="message-time">{moment(msg.createdAt).format('HH:mm')}</p>
                </div>
            ))
        )}
    </div>
);

export default Messages;
