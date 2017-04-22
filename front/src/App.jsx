import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import TurfList from './components/TurfList';

const App = (props) => (
  <div className="App">
    <h1>App</h1>
    <Link to={'/pizza'}>Pizza</Link>
    <button onClick={props.saveTurf}>Save Turf</button>
    <button onClick={props.polygonMode}>Add Shape</button>
    <TurfList />
  </div>
);

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  return {
    saveTurf: () => {
      dispatch({type: 'SAVE_TURF'});
    },
    polygonMode: () => {
      dispatch({type: 'POLYGON_MODE'});
    }
  };
}

export default connect(stateToProps, dispatchToProps)(App);
