import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRegSmile } from 'react-icons/fa';

import EmojiPicker from './EmojiPicker';

const MessageInput = ({ children, socket, sendMessage, adjustHeight }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [error, setError] = useState('');
  const messageInputRef = useRef(null);

  useEffect(() => {
    adjustHeight(messageInputRef.current.clientHeight);
  }, [adjustHeight, isEmojiPickerOpen]);

  const handleChange = e => {
    setError('');
    setMessage(e.target.value);
    socket.emit('chat:user_typing');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (message.length < 1 || message.length > 100) {
      setError('Message must be 1 - 100 characters long.');

      return;
    }

    sendMessage(message);
    setMessage('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }

      e.preventDefault();

      handleSubmit(e);
    }
  };

  const onAddEmoji = emoji => {
    setMessage(prevMessage => {
      return `${prevMessage}${emoji.native}`;
    });
  };

  return (
    <div>
      {children}
      <div className="px-5 pt-1 pb-5" style={{ borderTop: '1px solid #dbdbdb' }}>
        <form onSubmit={handleSubmit}>
          <div ref={messageInputRef}>
            <EmojiPicker handleEmoji={onAddEmoji} isOpen={isEmojiPickerOpen} />
          </div>
          <p className="help is-danger mt-0 mb-0" style={{ height: '1.25rem' }}>
            {error}
          </p>
          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="button is-outlined is-rounded"
                onClick={() => {
                  setIsEmojiPickerOpen(prevState => !prevState);
                }}
              >
                <span className="icon is-small">
                  <FaRegSmile />
                </span>
              </button>
            </div>
            <div className="control is-expanded">
              <textarea
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`textarea ${error ? 'is-danger' : ''}`}
                placeholder="Enter your message"
                rows="1"
                style={{
                  height: '40px',
                  padding: '0.3em 1em',
                  resize: 'none',
                  overflow: 'hidden',
                  borderRadius: '9999px',
                }}
                autoFocus
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-primary is-rounded">
                <span className="icon is-small">
                  <FaPaperPlane />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
