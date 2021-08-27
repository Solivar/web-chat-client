import React, { useContext, useEffect, useState, useRef } from 'react';

import * as styles from './ChatRoom.module.scss';
import { SocketContext } from '../context/socket';
import MessageInput from '../components/message/MessageInput';
import MessageList from '../components/message/MessageList';
import Notification from '../components/Notification';
import UserList from '../components/user/UserList';
import UserTyping from '../components/user/UserTyping';

const ChatRoom = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messageListElementRef = useRef(null);
  const messagesRef = useRef(messages);
  messages.current = messages;

  const [messageInputHeight, setMessageInputHeight] = useState(0);

  let timeout = useRef(null);

  useEffect(() => {
    if (messageListElementRef.current) {
      messageListElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
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

      if (timeout) {
        clearTimeout(timeout);
      }

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
      clearTimeout(timeout.current);
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
    <div className="is-full-height box p-0" style={{ border: '1px solid #dbdbdb' }}>
      <div className={`is-full-height is-flex`}>
        <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
          <div
            style={{ height: `calc(100% - 115px - ${messageInputHeight}px)` }}
            className="is-relative"
          >
            {error && <Notification error={error} closeError={closeError} />}

            <div className="is-full-height px-5 pt-5" style={{ overflowY: 'auto' }}>
              <MessageList messages={messages} bottomOfMessageListRef={messageListElementRef} />
            </div>
          </div>

          <MessageInput sendMessage={onSendMessage} adjustHeight={onAdjustHeight}>
            <UserTyping />
          </MessageInput>
        </div>
        <div className={`p-5 ${styles.userList}`}>
          <UserList handleUserJoin={onUserJoin} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
