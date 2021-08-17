import React from 'react';

const MessageList = ({ messages }) => {
  if (messages.length) {
    return (
      <ul>
        {messages.map(message => {
          return <li key={message.id}>{message.content}</li>;
        })}
      </ul>
    );
  }

  return <div></div>;
};

export default MessageList;
