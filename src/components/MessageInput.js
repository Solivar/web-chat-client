import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    sendMessage(message);
    setMessage('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <textarea
            value={message}
            onChange={handleChange}
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
