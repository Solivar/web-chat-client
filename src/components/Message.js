import React from 'react';

const Message = ({ message: { name, content, createdAt } }) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <div>
      <p>
        <strong>{name}</strong>
        <span className="has-text-grey is-size-7 ml-2">
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}
        </span>
      </p>
      <p>{content}</p>
    </div>
  );
};

export default Message;
