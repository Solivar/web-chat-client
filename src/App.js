import React, { useState } from 'react';

import './App.scss';
import { socket, SocketContext } from './context/socket';
import ChatRoom from './views/ChatRoom';
import NameSetup from './views/NameSetup';

const App = () => {
  const [name, setName] = useState('');

  const onUpdateName = newName => {
    setName(newName);
  };

  return (
    <div className="container is-max-widescreen is-full-height">
      <section className="section is-full-height">
        <SocketContext.Provider value={socket}>
          {name ? <ChatRoom /> : <NameSetup updateName={onUpdateName} />}
        </SocketContext.Provider>
      </section>
    </div>
  );
};

export default App;
