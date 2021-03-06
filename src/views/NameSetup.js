import React, { useContext, useEffect, useState } from 'react';

import * as styles from './NameSetup.module.scss';
import { FaArrowRight } from 'react-icons/fa';
import { SocketContext } from '../context/socket';

const NameSetup = ({ updateName }) => {
  const socket = useContext(SocketContext);

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('join:exception', message => {
      setError(message);
    });

    socket.on('join:response', message => {
      updateName(message);
    });
  }, [socket, updateName]);

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (name.length < 1 || name.length > 25) {
      setError('Name must be 1 - 25 characters long.');

      return;
    }

    socket.emit('join:set_name', name);
  };

  return (
    <div className="is-full-height is-flex is-justify-content-center is-align-items-center">
      <div className={`box ${styles.form}`}>
        <h1 className="title">Web Chat App</h1>
        <p className="block">You need to specify a name before you can start chatting.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="control">
              <input
                id="name"
                className={`input ${error ? 'is-danger' : ''}`}
                placeholder="Enter your name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <p className="help is-danger">{error}</p>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">
                <span className="is-uppercase has-text-weight-semibold">Start chatting</span>
                <span className="icon is-small mt-1">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameSetup;
