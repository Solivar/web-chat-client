import React, { useEffect, useState, useRef } from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import * as styles from './ChatRoom.module.scss';

const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messageListElementRef = useRef(null);

  let timeout = useRef(null);

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

    const handleError = error => {
      setError(error);

      timeout.current = setTimeout(() => {
        setError('');
      }, 5000);
    };

    socket.on('chat:message', receiveNewMessage);
    socket.on('chat:message_list', receiveAllMessages);
    socket.on('chat:error', handleError);

    return () => {
      socket.off('chat:message', receiveNewMessage);
      socket.off('chat:message_list', receiveAllMessages);
      socket.off('chat:error', handleError);
    };
  }, [socket]);

  const closeError = () => {
    setError('');
    clearTimeout(timeout.current);
  };

  const onSendMessage = message => {
    socket.emit('chat:send_message', message);
  };

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1 is-relative">
        <div className="px-5 pt-5" style={{ overflowY: 'auto' }}>
          {error && (
            <div
              className="notification is-danger is-light"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50%',
              }}
            >
              <button className="delete" onClick={closeError}></button>
              {error}
            </div>
          )}
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
