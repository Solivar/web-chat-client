import React, { useState } from 'react';
import io from 'socket.io-client';

import './App.scss';
import ChatRoom from './views/ChatRoom';
import Name from './views/Name';

const socket = io.connect('http://localhost:8000');

const App = () => {
  const [name, setName] = useState('');

  const onUpdateName = newName => {
    setName(newName);
  };

  return (
    <div className="container is-max-widescreen is-full-height">
      <section className="section is-full-height">
        {!name && (
          <div className="is-full-height is-flex is-justify-content-center is-align-items-center">
            <Name socket={socket} updateName={onUpdateName} />
          </div>
        )}
        {name && (
          <div className="is-full-height App box p-0">
            <ChatRoom socket={socket} />
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
