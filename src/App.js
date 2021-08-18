import './App.scss';
import ChatRoom from './views/ChatRoom';
import Name from './views/Name';

function App() {
  return (
    <div className="container is-max-widescreen is-full-height">
      <section className="section is-full-height">
        {/* <div className="is-full-height App box p-0">
          <ChatRoom />
        </div> */}
        <div className="is-full-height is-flex is-justify-content-center is-align-items-center">
          <Name />
        </div>
      </section>
    </div>
  );
}

export default App;
