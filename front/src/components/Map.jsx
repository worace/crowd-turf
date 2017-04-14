import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import {connect} from 'react-redux';
import Utils from '../utils';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const Map = (props) => (
  <div style={{position: 'relative'}}>
    <ReactMapboxGl
      // eslint-disable-next-line
      style='mapbox://styles/mapbox/basic-v9'
      accessToken={MapboxToken}
      center={Utils.pointTuple(props.center)}
      containerStyle={{height: '100vh', width: '100vw'}} />
  </div>
);

const stateToProps = (state) => ({
  center: state.get('center').toJS()
});

export default connect(stateToProps)(Map);
