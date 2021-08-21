import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setError('');
    setMessage(e.target.value);
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

  return (
    <form onSubmit={handleSubmit}>
      <p className="help is-danger mt-0 mb-2">{error}</p>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <textarea
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="textarea"
            placeholder="Enter your message"
            rows="1"
            style={{ height: '40px', padding: '0.25em 0.5em', resize: 'none', overflow: 'hidden' }}
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-primary">
            <span className="icon is-small">
              <i className="fas fa-paper-plane">
                <FaPaperPlane />
              </i>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
