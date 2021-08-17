import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserList;
