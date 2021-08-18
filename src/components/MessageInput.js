import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = () => {
  return (
    <form>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <textarea
            className="textarea"
            placeholder="Enter your message"
            rows="1"
            style={{ height: '40px', padding: '0.25em 0.5em' }}
          ></textarea>
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
