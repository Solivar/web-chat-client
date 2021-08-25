import React from 'react';

const Message = ({ message: { name, content, createdAt, isAnnouncement } }) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const isToday = () => {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getMessageTime = () => {
    if (isToday(createdAt)) {
      return `${hours}:${formattedMinutes}`;
    }

    return date.toLocaleDateString('eu', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isAnnouncement) {
    return (
      <div className="has-text-grey">
        <p>{content}</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        <strong>{name}</strong>
        <span className="has-text-grey is-size-7 ml-2" title={date}>
          {getMessageTime()}
        </span>
      </p>
      <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
    </div>
  );
};

export default Message;
