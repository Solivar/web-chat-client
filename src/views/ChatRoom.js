import React, { useEffect, useState } from 'react';

import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import data from './chat-room.json';
import * as styles from './ChatRoom.module.scss';

const ChatRoom = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const messages = data.messages;

  useEffect(() => {
    console.log('firing');
    socket.emit('chat:get_user_list');

    const receiveNewUser = userName => {
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers.push({ name: userName });

        return newUsers;
      });
    };

    const receiveAllUsers = allUsers => {
      const newUsers = [...allUsers];

      setUsers(newUsers);
    };

    socket.on('chat:user_list', receiveAllUsers);
    socket.on('chat:user_join', receiveNewUser);

    return () => {
      socket.off('chat:user_list', receiveAllUsers);
      socket.off('chat:user_join', receiveNewUser);
    };
  }, [socket]);

  return (
    <div className={`is-full-height is-flex`}>
      <div className="is-full-height is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
        <div className="p-5">
          <MessageList messages={messages} />
        </div>
        <div className={styles.messageInput}>
          <div className="p-5">
            <MessageInput />
          </div>
        </div>
      </div>
      <div className={`p-5 ${styles.userList}`}>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default ChatRoom;
