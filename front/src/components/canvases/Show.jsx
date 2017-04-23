import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import TurfList from './TurfList';
import Store from '../../store';
import Map from '../Map';
import Api from '../../api';

class CanvasShow extends Component {
  componentWillMount() {
    this.map = new Map(Store, 'map');
    this.props.loadTurf(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.map.unmount();
  }

  render() {
    return (
      <div className="App">
        <h1>Turf Set</h1>
        <Link to={'/'}>
          <p>Back to all lists</p>
        </Link>
        <button onClick={this.props.saveTurf}>Save Turf</button>
        <button onClick={this.props.polygonMode}>Add Shape</button>
        <TurfList />
      </div>
    );
  }
}

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  return {
    loadTurf: (canvasId) => {
      dispatch({type: 'TURF_REQUESTED'});
      Api.getTurf(canvasId, dispatch);
    },
    saveTurf: () => {
      dispatch({type: 'SAVE_TURF'});
    },
    polygonMode: () => {
      dispatch({type: 'POLYGON_MODE'});
    }
  };
}

export default connect(stateToProps, dispatchToProps)(CanvasShow);
