import Imm from 'immutable';
import _ from 'lodash';
import pp from 'pretty-immutable';
import Utils from './utils';
import Geojson from './geojson';

window.pp = pp;
window.Imm = Imm;

function inc(i) { return i + 1; }

function mapLoaded(state, action) {
  return state.set('map', action.payload.map).set('drawControl', action.payload.drawControl);
}

function polygonMode(state) {
  const draw = state.get('drawControl');
  draw.changeMode(draw.modes.DRAW_POLYGON);
  return state;
}

function excludeFeature(feature, list) {
  const id = feature.getIn(['properties', 'id']);
  return list.filterNot(f => f.getIn(['properties', 'id']) === id);
}

function saveTurf(state) {
  const draw = state.get('drawControl');

  const props = state.getIn(['currentTurf', 'properties']);
  const index = props.get('index', state.get('nextIndex'));
  const newTurf = Geojson.mergeFeatureCollection(props.set('index', index),
                                                 Imm.fromJS(draw.getAll()));

  draw.deleteAll();
  draw.changeMode(draw.modes.DRAW_POLYGON);
  return state
    .update('nextIndex', inc)
    .set('currentTurf', Utils.feature().setIn(['properties', 'label'], ))
    .updateIn(['turfSet', 'features'],
              _.partial(excludeFeature, newTurf))
    .updateIn(['turfSet', 'features'], list => list.push(newTurf));
}

function featureSelected(state, action) {
  const feature = action.payload;
  const draw = state.get('drawControl');
  const featureColl = Utils
        .featureCollection()
        .update('features', l => l.push(feature));

  const featureId = draw.set(featureColl.toJS());
  draw.changeMode(draw.modes.DIRECT_SELECT, {featureId});

  return state.set('currentTurf', feature);
}

function canvasAdded(state, action) {
  return state.update('canvases', l => l.push(action.payload));
}

function canvasesReceived(state, action) {
  return state.set('canvases', action.payload);
}

const ActionHandlers = {
  MAP_LOADED: mapLoaded,
  POLYGON_MODE: polygonMode,
  FEATURE_SELECTED: featureSelected,
  CANVAS_ADDED: canvasAdded,
  CANVASES_RECEIVED: canvasesReceived,
  HOVER_START: (state, action) => state.set('hoverFeature', action.payload),
  HOVER_END: (state) => state.set('hoverFeature', Utils.feature()),
  SAVE_TURF: saveTurf,
  MAP_MOVED: (state, action) => state.set('center', Imm.List(action.payload))
};

const reducers = (state, action) => {
  const handler = ActionHandlers[action.type];
  if (handler) {
    const next = handler(state, action);
    return next;
  }
  return state;
};

export default reducers;
