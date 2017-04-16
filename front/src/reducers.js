import Imm from 'immutable';
import Utils from './utils';

window.Imm = Imm;

// GeoJSON Features
// 1 coord -- point
// 2 or 3 coords -- linestring
// 4 + coords -- polygon

function updateFeature(previous, coords) {
  const keypath = ['geometry', 'coordinates'];
  return previous.updateIn(keypath, list => list.push(coords));
}

function featuresAdded(state, action) {
  const geometries = action.payload.map(feature => feature.geometry.coordinates);
  return state.updateIn(['currentTurf', 'geometry', 'coordinates'],
                        list => list.concat(Imm.List(geometries)));
}

function mapLoaded(state, action) {
  return state.set('map', action.payload.map)
    .set('drawControl', action.payload.drawControl);
}

function polygonMode(state) {
  const draw = state.get('drawControl');
  draw.changeMode(draw.modes.DRAW_POLYGON);
  return state;
}

function saveTurf(state) {
  const draw = state.get('drawControl');
  draw.deleteAll();
  draw.changeMode(draw.modes.DRAW_POLYGON);
  return state.set('currentTurf', Utils.feature())
    .updateIn(['turfSet', 'features'], list => list.push(state.get('currentTurf')));
}

const ActionHandlers = {
  MAP_LOADED: mapLoaded,
  POLYGON_MODE: polygonMode,
  FEATURES_ADDED: featuresAdded,
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
