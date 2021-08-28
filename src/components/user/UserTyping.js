import React, { useContext, useEffect, useRef, useState } from 'react';

import { SocketContext } from '../../context/socket';

const UserTyping = () => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const usersRef = useRef(users);
  usersRef.current = users;

  useEffect(() => {
    const receiveUserTyping = name => {
      const newUsers = [...usersRef.current];
      const userIndex = usersRef.current.findIndex(user => user.name === name);

      const timeout = setTimeout(() => {
        const newUsers = [...usersRef.current];
        const userIndex = usersRef.current.findIndex(user => user.name === name);

        if (userIndex > -1) {
          newUsers.splice(userIndex, 1);
          setUsers(newUsers);
        }
      }, 1000 * 5);

      if (userIndex > -1) {
        clearTimeout(newUsers[userIndex].timeout);

        newUsers[userIndex].timeout = timeout;
      } else {
        newUsers.push({ name, timeout });
      }

      setUsers(newUsers);
    };

    const clearTimeouts = () => {
      for (const user of usersRef.current) {
        clearTimeout(user.timeout);
      }
    };

    socket.on('chat:user_typing', receiveUserTyping);

    return () => {
      socket.off('chat:user_typing', receiveUserTyping);

      clearTimeouts();
    };
  }, [socket]);

  const getUserTypingMessage = () => {
    if (users.length > 2) {
      return `${users.length} users are typing.`;
    } else if (users.length > 1) {
      return `${users[0].name} and ${users[1].name} are typing.`;
    }

    return `${users[0].name} is typing.`;
  };

  return (
    <div style={{ height: '26px' }}>
      {users.length > 0 && (
        <div className="has-background-light has-text-grey is-size-7 px-5 py-1">
          {getUserTypingMessage()}
        </div>
      )}
    </div>
  );
};

export default UserTyping;
