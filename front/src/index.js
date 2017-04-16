import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store';
import './css/index.css';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [-118.5884298, 34.3921461],
  zoom: 17
});

const draw = new MapboxDraw({keybindings: true});
map.addControl(draw);

map.on('load', () => {
  map.on('draw.create', console.log);
  map.on('draw.update', console.log);
  map.on('draw.modechange', console.log);
});

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('ui')
);

