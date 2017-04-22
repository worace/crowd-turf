import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TurfSet from './components/TurfSet';
import TurfSetList from './components/TurfSetList';
import NewCanvas from './components/canvases/new';
import Store from './store';
import './css/index.css';

window.Store = Store;

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <Router>
      <div>
        <Route exact path="/" component={TurfSetList} />
        <Route path="/canvas/:id" component={TurfSet} />
        <Route exact path="/new_canvas" component={NewCanvas} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('ui')
);
