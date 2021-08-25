import React, { useState } from 'react';
import io from 'socket.io-client';

import './App.scss';
import ChatRoom from './views/ChatRoom';
import NameSetup from './views/NameSetup';

const socket = io.connect(process.env.REACT_APP_SERVER_ADDRESS);

const App = () => {
  const [name, setName] = useState('');

  const onUpdateName = newName => {
    setName(newName);
  };

  return (
    <div className="container is-max-widescreen is-full-height">
      <section className="section is-full-height">
        {name ? (
          <ChatRoom socket={socket} />
        ) : (
          <NameSetup socket={socket} updateName={onUpdateName} />
        )}
      </section>
    </div>
  );
};

export default App;
