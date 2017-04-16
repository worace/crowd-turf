import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store';
import './css/index.css';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';


ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('ui')
);

mapboxgl.accessToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [-118.5884298, 34.3921461],
  zoom: 17
});

const draw = new MapboxDraw({displayControlsDefault: false});
map.addControl(draw);

function updateTurfSet(map, state) {
  map.getSource('turfSet').setData(state.get('turfSet').toJS());
}

map.on('load', () => {
  Store.dispatch({type: 'MAP_LOADED', payload: {map, drawControl: draw}});
  map.addSource('turfSet',
                {type: 'geojson',
                 data: Store.getState().get('turfSet').toJS()});

  map.addLayer({
    'id': 'turfSet',
    'type': 'fill',
    'source': 'turfSet',
    'layout': {},
    'paint': {
      'fill-color': '#33FFFC',
      'fill-opacity': 0.8
    }
  });


  Store.subscribe(() => {
    updateTurfSet(map, Store.getState());
  });

  draw.changeMode(draw.modes.DRAW_POLYGON);

  map.on('draw.create', ({features}) => {
    Store.dispatch({type: 'FEATURES_ADDED', payload: features});
  });

  map.on('draw.update', console.log);
  map.on('draw.modechange', console.log);
});
