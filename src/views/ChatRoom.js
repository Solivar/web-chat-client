import React, { useEffect, useState, useRef } from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import * as styles from './ChatRoom.module.scss';

const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const messageListElementRef = useRef(null);

  useEffect(() => {
    messageListElementRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [messages]);

  useEffect(() => {
    socket.emit('chat:get_message_list');
  }, [socket]);

  useEffect(() => {
    const receiveNewMessage = message => {
      setMessages(prevMessages => {
        const newMessage = [...prevMessages];
        newMessage.push(message);

        return newMessage;
      });
    };

    const receiveAllMessages = allMessages => {
      setMessages(allMessages);
    };

    socket.on('chat:message', receiveNewMessage);
    socket.on('chat:message_list', receiveAllMessages);

    return () => {
      socket.off('chat:message', receiveNewMessage);
      socket.off('chat:message_list', receiveAllMessages);
    };
  }, [socket]);

  const onSendMessage = message => {
    socket.emit('chat:send_message', message);
  };

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
        <div className="px-5 pt-5" style={{ overflowY: 'auto' }}>
          <MessageList messages={messages} />
          <div ref={messageListElementRef} className="pb-5" />
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
