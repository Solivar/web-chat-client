import './App.scss';
import ChatRoom from './views/ChatRoom';

function App() {
  return (
    <div className="container is-max-widescreen is-full-height">
      <section className="section is-full-height">
        <div className="is-full-height App">
          <ChatRoom />
        </div>
      </section>
    </div>
  );
}

export default App;
