import React from 'react';

import Message from './Message';

const MessageList = ({ messages }) => {
  if (messages.length) {
    return (
      <ul>
        {messages.map((message, index) => {
          return (
            <li key={message.id} className={`${index === messages.length - 1 ? '' : 'mb-3'}`}>
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
