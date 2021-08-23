import React, { useEffect, useRef, useState } from 'react';

import * as styles from './UserList.module.scss';

const UserList = ({ socket, handleUserJoin }) => {
  const [users, setUsers] = useState([]);
  const usersRef = useRef(users);
  usersRef.current = users;

  const handleUserJoinRef = useRef(handleUserJoin);
  handleUserJoinRef.current = handleUserJoin;

  useEffect(() => {
    socket.emit('chat:get_user_list');
  }, [socket]);

  useEffect(() => {
    const receiveNewUser = userName => {
      const newUsers = [...usersRef.current];
      newUsers.push(userName);
      newUsers.sort();

      handleUserJoinRef.current(userName);

      usersRef.current = newUsers;
      setUsers(newUsers);
    };

    const receiveAllUsers = allUsers => {
      setUsers(allUsers);
    };

    const receiveDisconnectedUser = userName => {
      const newUsers = [...usersRef.current];
      const userIndex = newUsers.indexOf(userName);

      newUsers.splice(userIndex, 1);
      setUsers(newUsers);
    };

    socket.on('chat:user_list', receiveAllUsers);
    socket.on('chat:user_join', receiveNewUser);
    socket.on('chat:user_leave', receiveDisconnectedUser);

    return () => {
      socket.off('chat:user_list', receiveAllUsers);
      socket.off('chat:user_join', receiveNewUser);
      socket.off('chat:user_leave', receiveDisconnectedUser);
    };
  }, [socket]);

  return (
    <div className={styles.list}>
      <div>
        <strong>Users ({users.length})</strong>
      </div>
      <ul>
        {users.map(name => {
          return (
            <li key={name} className={styles.user}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
