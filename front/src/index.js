import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Canvas from './components/canvases/Show';
import CanvasIndex from './components/canvases/Index';
import NewCanvas from './components/canvases/New';
import Store from './store';
import './css/index.css';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <Router>
      <div>
        <Route exact path="/" component={CanvasIndex} />
        <Route path="/canvas/:id" component={Canvas} />
        <Route exact path="/new_canvas" component={NewCanvas} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('ui')
);
