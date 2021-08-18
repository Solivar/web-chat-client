import React, { useState } from 'react';

import './App.scss';
import ChatRoom from './views/ChatRoom';
import Name from './views/Name';

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
            <Name name={name} updateName={onUpdateName} />
          </div>
        )}
        {name && (
          <div className="is-full-height App box p-0">
            <ChatRoom />
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
