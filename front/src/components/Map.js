import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

function updateMap(map, state) {
  map.getSource('turfSet').setData(state.get('turfSet').toJS());
  map.getSource('hover').setData(state.get('hoverFeature').toJS());
}

const turfLayer = {
  'id': 'turfSet',
  'type': 'fill',
  'source': 'turfSet',
  'layout': {},
  'paint': {
    'fill-color': '#33FFFC',
    'fill-opacity': 0.6
  }
};

const hoverLayer = {
  'id': 'hover',
  'type': 'fill',
  'source': 'hover',
  'layout': {},
  'paint': {
    'fill-color': '#33FFFC',
    'fill-opacity': 0.8
  }
};

function initSources(map, state) {
  map.addSource('turfSet',
                {type: 'geojson',
                 data: state.get('turfSet').toJS()});
  map.addLayer(turfLayer);

  map.addSource('hover',
                {type: 'geojson',
                 data: state.get('hoverFeature').toJS()});
  map.addLayer(hoverLayer);
}

function initDispatch(map, store) {
  map.on('draw.create', ({features}) => store.dispatch({type: 'FEATURES_ADDED', payload: features}));
  map.on('click', 'turfSet', console.log);
}

function initSubscriptions(map, store) {
  store.subscribe(() => updateMap(map, store.getState()));
}

function init(store) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-118.5884298, 34.3921461],
    zoom: 17
  });

  const draw = new MapboxDraw({displayControlsDefault: false});
  map.addControl(draw);

  map.on('load', () => {
    initSources(map, store.getState());
    initDispatch(map, store);
    initSubscriptions(map, store);
    draw.changeMode(draw.modes.DRAW_POLYGON);
    store.dispatch({type: 'MAP_LOADED',
                    payload: {map, drawControl: draw}});
  });
}

export default {init};
