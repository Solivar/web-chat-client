import React from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import data from './chat-room.json';
import * as styles from './ChatRoom.module.scss';

const ChatRoom = () => {
  const users = data.users;
  const messages = data.messages;

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
        <div className="p-4">
          <MessageList messages={messages} />
        </div>
        <div className={styles.messageInput}>
          <div className="p-4">
            <MessageInput />
          </div>
        </div>
      </div>
      <div className={`p-4 ${styles.userList}`}>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default ChatRoom;
