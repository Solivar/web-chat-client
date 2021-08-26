import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

import * as styles from './UserList.module.scss';
import { SocketContext } from '../../context/socket';

const UserList = ({ handleUserJoin }) => {
  const socket = useContext(SocketContext);
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
        <strong>
          <span className="icon-text is-align-items-center">
            <span className="icon is-small mr-1">
              <FaCircle style={{ color: '#4fcc49' }} />
            </span>
            Online users ({users.length})
          </span>
        </strong>
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
