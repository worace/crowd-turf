import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import {connect} from 'react-redux';
import Utils from '../utils';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const Map = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <ReactMapboxGl
        // eslint-disable-next-line
        style='mapbox://styles/mapbox/basic-v9'
        accessToken={MapboxToken}
        center={Utils.pointTuple(props.center)}
        containerStyle={{height: '100vh', width: '100vw'}}>
        <GeoJSONLayer
          linePaint={{'line-color': '#000000'}}
          fillPaint={{'fill-color': '#000000', 'fill-opacity': 0.5}}
          data={props.currentFeature} />
      </ReactMapboxGl>
    </div>
  );
};

const stateToProps = (state) => ({
  center: state.get('center').toJS(),
  currentFeature: state.get('currentFeature')
});

export default connect(stateToProps)(Map);
