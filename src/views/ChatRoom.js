import React, { useEffect, useState, useRef } from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';
import UserTyping from '../components/UserTyping';

import * as styles from './ChatRoom.module.scss';

const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messageListElementRef = useRef(null);
  const messagesRef = useRef(messages);
  messages.current = messages;

  const [messageInputHeight, setMessageInputHeight] = useState(0);

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
      const newMessages = [...messagesRef.current];
      newMessages.push(message);

      messagesRef.current = newMessages;
      setMessages(newMessages);
    };

    const receiveAllMessages = allMessages => {
      messagesRef.current = allMessages;
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

  const onUserJoin = name => {
    const newMessages = [...messagesRef.current];

    messagesRef.current = newMessages;
    newMessages.push({ id: name, isAnnouncement: true, content: `${name} has joined.` });

    setMessages(newMessages);
  };

  const onAdjustHeight = height => {
    setMessageInputHeight(height);
  };

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
        <div
          style={{ height: `calc(100% - 89px - ${messageInputHeight}px)` }}
          className="is-relative"
        >
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

          <div className="is-full-height px-5 pt-5" style={{ overflowY: 'auto' }}>
            <MessageList messages={messages} />
            <div ref={messageListElementRef} className="py-5" />
          </div>
          <UserTyping socket={socket} />
        </div>

        <div className={styles.messageInput}>
          <div className="px-5 pt-1 pb-5">
            <MessageInput
              socket={socket}
              sendMessage={onSendMessage}
              adjustHeight={onAdjustHeight}
            />
          </div>
        </div>
      </div>
      <div className={`p-5 ${styles.userList}`}>
        <UserList socket={socket} handleUserJoin={onUserJoin} />
      </div>
    </div>
  );
};

export default ChatRoom;
