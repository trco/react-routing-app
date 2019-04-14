import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';


const topMargin = {
  marginTop: '3em'
};

const Link = ({ to, children }, { history }) => (
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

Link.contextTypes = {
  history: PropTypes.object
};

const Route = ({ path, component: Component }, { location }) => {
  const pathname = location.pathname;
  if (pathname.match(path)) {
    return <Component />;
  } else {
    return null;
  }
};

Route.contextTypes = {
  location: PropTypes.object
};

class Redirect extends React.Component {

  static contextTypes = {
    history: PropTypes.object,
  }

  // Performs redirect to 'to' after it's mounted
  componentDidMount() {
    const history = this.context.history;
    const to = this.props.to;
    history.push(to);
  }

  render() {
    return null;
  }
};

class Router extends React.Component {

  // To expose context to children specify the type of each context
  static childContextTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  };

  // Add history & location to the Router
  constructor(props) {
    super(props);
    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }

  // Add history & location to the context accessible to Router's children
  getChildContext() {
    return {
      history: this.history,
      location: window.location
    };
  }

  render() {
    return this.props.children;
  }
}

const App = () => (
  <Router>
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
        <li>
          <Link to='/black-sea'>
            <code>/black-sea</code>
          </Link>
        </li>
      </ul>

      <hr />

      <Route path='/atlantic' component={Atlantic}/>
      <Route path='/pacific' component={Pacific}/>
      <Route path='/black-sea' component={BlackSea}/>
    </div>
  </Router>
);

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

class BlackSea extends React.Component {

  state = {
    counter: 3
  }

  componentDidMount() {
    this.interval = setInterval(() => (
      this.setState(prevState => {
        return {
          counter: prevState.counter - 1,
        };
      }
    )), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h3>Black sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in {this.state.counter}...</p>
        {this.state.counter < 1 ? <Redirect to='/' /> : null}
      </div>
    );
  }
};
