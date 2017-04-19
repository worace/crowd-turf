import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Imm from 'immutable';
import _ from 'lodash';
import pp from 'pretty-immutable';
import Utils from '../utils';

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

function featureSelected(dispatch, {features}) {
  const feature = {};
  console.log('SELECTED FEATURE');
  ['properties', 'type', 'geometry'].forEach(k => {
    feature[k] = features[0][k];
  });
  console.log(pp(Imm.fromJS(feature)));
  // PROBLEM: Mapbox Seems to convert single-feature multipolygons to
  // polygons when adding them to a source
  // Then when we set them back to "current feature" and add
  // them to the draw plugin, this prevents us from being able to
  // add second features correctly

  // Solutions:
  // 1. Rather than pulling Feature object our of mapbox pull the ID
  //    and submit this with the action. Then keep a separate map of
  //    feature ID to feature that we use to pass the data to
  //    draw
  // 2. Add more intelligent logic for capturing the results of
  //    draw events and adding them to "currentTurf"
  //    -- would need to update featuresUpdated and featuresAdded
  //       handlers to more accurately combine multiple features into
  //       a single multipolygon
  // 3. Rather than reading feature added / feature updated payloads,
  //    always read from draw.getAll() -- this would give a featurecollection
  //    of all up-to-date features
  //    Then could merge this into a single MultiPolygon and set as
  //    Current Feature
  dispatch({type: 'FEATURE_SELECTED', payload: Imm.fromJS(feature)});
}

function initDispatch(map, store) {
  map.on('draw.create', ({features}) => store.dispatch({type: 'FEATURES_ADDED', payload: features}));
  map.on('draw.update', ({features}) => store.dispatch({type: 'FEATURES_UPDATED', payload: features}));
  map.on('click', 'turfSet', _.partial(featureSelected, store.dispatch));
}

function initSubscriptions(map, store) {
  store.subscribe(() => updateMap(map, store.getState()));
}

function init(store) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-118.58955, 34.39400],
    zoom: 17
  });

  const draw = new MapboxDraw({displayControlsDefault: false});
  map.addControl(draw);
  window.map = map;
  window.draw = draw;

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
