import React from 'react';

import * as styles from './UserList.module.scss';

const UserList = ({ users }) => {
  return (
    <div className={styles.list}>
      <div>
        <strong>Users ({users.length})</strong>
      </div>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id} className={styles.user}>
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
