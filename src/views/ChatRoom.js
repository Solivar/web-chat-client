import React, { useEffect, useState } from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import * as styles from './ChatRoom.module.scss';

const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiveNewMessage = message => {
      setMessages(prevMessages => {
        const newMessage = [...prevMessages];
        newMessage.push(message);

        return newMessage;
      });
    };

    socket.on('chat:message', receiveNewMessage);

    return () => {
      socket.off('chat:message', receiveNewMessage);
    };
  });

  const onSendMessage = message => {
    socket.emit('chat:send_message', message);
  };

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
        <div className="p-5">
          <MessageList messages={messages} />
        </div>
        <div className={styles.messageInput}>
          <div className="p-5">
            <MessageInput sendMessage={onSendMessage} />
          </div>
        </div>
      </div>
      <div className={`p-5 ${styles.userList}`}>
        <UserList socket={socket} />
      </div>
    </div>
  );
};

export default ChatRoom;
