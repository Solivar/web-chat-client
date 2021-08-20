import React from 'react';

import * as styles from './UserList.module.scss';

const UserList = ({ users }) => {
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
