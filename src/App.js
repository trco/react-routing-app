import React from 'react';
import 'semantic-ui-css/semantic.min.css';


const topMargin = {
  marginTop: '3em'
};

class App extends React.Component {

  render() {
    return (
      <div className='ui text container' style={topMargin}>

        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <a href='/atlantic'>
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'>
              <code>/pacific</code>
            </a>
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


const Route = ({ path, component: Component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return <Component />;
  } else {
    return null;
  }
};

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
    The Atlantic Ocean covers approximately 1/5th of the
    surface of the earth.
    </p>
  </div>
)

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
    Ferdinand Magellan, a Portuguese explorer, named the ocean
    'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
)
