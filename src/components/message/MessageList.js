import React from 'react';

import Message from './Message';

const MessageList = ({ messages, bottomOfMessageListRef }) => {
  if (messages.length) {
    return (
      <>
        <ul>
          {messages.map((message, index) => {
            if (index === messages.length - 1) {
              return (
                <li
                  className={`${index === messages.length - 1 ? '' : 'mb-3'}`}
                  key={message.id}
                  ref={bottomOfMessageListRef}
                >
                  <Message message={message} />
                </li>
              );
            }

            return (
              <li key={message.id} className="mb-3">
                <Message message={message} />
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return <div>No messages.</div>;
};

export default MessageList;
