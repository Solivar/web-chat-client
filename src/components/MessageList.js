import React from 'react';

import Message from './Message';

const MessageList = ({ messages }) => {
  if (messages.length) {
    return (
      <ul>
        {messages.map(message => {
          return (
            <li key={message.id} className="mb-3">
              <Message message={message} />
            </li>
          );
        })}
      </ul>
    );
  }

  return <div>No messages.</div>;
};

export default MessageList;
