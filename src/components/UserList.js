import React, { useEffect, useState } from 'react';

import * as styles from './UserList.module.scss';

const UserList = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('chat:get_user_list');
  }, [socket]);

  useEffect(() => {
    const receiveNewUser = userName => {
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers.push(userName);

        return newUsers;
      });
    };

    const receiveAllUsers = allUsers => {
      const newUsers = [...allUsers];

      setUsers(newUsers);
    };

    const receiveDisconnectedUser = userName => {
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        const userIndex = newUsers.indexOf(userName);

        newUsers.splice(userIndex, 1);

        return newUsers;
      });
    };

    socket.on('chat:user_list', receiveAllUsers);
    socket.on('chat:user_join', receiveNewUser);
    socket.on('chat:user_leave', receiveDisconnectedUser);

    return () => {
      socket.off('chat:user_list', receiveAllUsers);
      socket.off('chat:user_join', receiveNewUser);
      socket.off('chat:user_leave', receiveDisconnectedUser);
    };
  });

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
