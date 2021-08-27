import React from 'react';

const Notification = ({ error, closeError }) => {
  return (
    <div
      className="notification is-danger is-light"
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
      }}
    >
      <button className="delete" onClick={closeError}></button>
      {error}
    </div>
  );
};

export default Notification;
