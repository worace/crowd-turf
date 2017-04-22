import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './App';
import Map from './components/Map';
import Store from './store';
import './css/index.css';

window.Store = Store;

Map.init(Store);

const page = () => (
  <div>
    <h1>Some Page</h1>
    <Link to={'/'}>Main</Link>
  </div>
);

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/pizza" component={page} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('ui')
);
