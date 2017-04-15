import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import {connect} from 'react-redux';
import Utils from '../utils';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

class Map extends Component {
  currentFeature() {
    console.log('************')
    console.log(this.props.currentFeaure);
    if (this.props.currentFeature) {
      return (
        <GeoJSONLayer
          linePaint={{'line-color': '#000000'}}
          fillPaint={{'fill-color': '#000000', 'fill-opacity': 0.5}}
          data={this.props.currentFeature} />
      );
    }
    return null;
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <ReactMapboxGl
          // eslint-disable-next-line
          style='mapbox://styles/mapbox/basic-v9'
          accessToken={MapboxToken}
          center={Utils.pointTuple(this.props.center)}
          containerStyle={{height: '100vh', width: '100vw'}}
          onClick={this.props.mapClick} >
          {this.currentFeature()}
        </ReactMapboxGl>
      </div>
    );
  }
}

function stateToProps(state) {
  console.log(state);
  console.log(state.toJS());
  return {
    center: state.get('center').toJS(),
    currentFeature: state.get('currentFeature')
  };
}

function dispatchToProps(dispatch) {
  return {
    mapClick: (map, event) => {
      dispatch({type: 'POINT_ADDED',
                payload: Utils.coordinate(event.lngLat)});
    }
  };
}

export default connect(stateToProps, dispatchToProps)(Map);
