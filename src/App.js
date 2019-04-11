import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import createHistory from 'history/createBrowserHistory';


const topMargin = {
  marginTop: '3em'
};

const history = createHistory();

const Link = ({ to, children }) => (
  <a
    onClick={(evt) => {
      evt.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
);

const Route = ({ path, component: Component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return <Component />;
  } else {
    return null;
  }
};

class App extends React.Component {

  componentDidMount() {
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <div className='ui text container' style={topMargin}>

        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <code>/pacific</code>
            </Link>
          </li>
        </ul>

        <hr />

        <Route path='/atlantic' component={Atlantic}/>
        <Route path='/pacific' component={Pacific}/>
      </div>
    );
  }
}

export default App;

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
    The Atlantic Ocean covers approximately 1/5th of the
    surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
    Ferdinand Magellan, a Portuguese explorer, named the ocean
    'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);
