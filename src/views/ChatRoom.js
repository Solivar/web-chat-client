import React from 'react';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';

import data from './chat-room.json';

const ChatRoom = () => {
  const users = data.users;
  const messages = data.messages;

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters">
            <MessageList messages={messages} />
          </div>
          <div className="column">
            <UserList users={users} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
