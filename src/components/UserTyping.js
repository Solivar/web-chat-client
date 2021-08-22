import React, { useEffect, useState } from 'react';

const UserTyping = ({ socket }) => {
  const [userTyping, setUserTyping] = useState(null);

  useEffect(() => {
    const receiveUserTyping = name => {
      setUserTyping(prevUserTyping => {
        if (prevUserTyping && prevUserTyping.timeout) {
          clearTimeout(prevUserTyping.timeout);
        }

        const timeout = setTimeout(() => {
          setUserTyping(null);
        }, 1000 * 5);

        return { name, timeout };
      });
    };

    socket.on('chat:user_typing', receiveUserTyping);

    return () => {
      socket.off('chat:user_typing', receiveUserTyping);
    };
  }, [socket]);

  const getUserTypingMessage = () => {
    return `${userTyping.name} is typing`;
  };

  return (
    <>
      {userTyping && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
          className="has-background-light has-text-grey is-size-7 px-5 py-1"
        >
          {getUserTypingMessage()}
        </div>
      )}
    </>
  );
};

export default UserTyping;
