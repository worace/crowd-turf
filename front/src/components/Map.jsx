import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const Map = () => (
  <div style={{position: 'relative'}}>
    <ReactMapboxGl
      // eslint-disable-next-line
      style='mapbox://styles/mapbox/basic-v9'
      accessToken={MapboxToken}
      center={[-118, 34]}
      containerStyle={{height: '100vh', width: '100vw'}} />
  </div>
);

export default Map;
