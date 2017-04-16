import Imm from 'immutable';
import Utils from './utils';

function inc(i) { return i + 1; }

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

  const newTurf = state
        .get('currentTurf')
        .setIn(['properties', 'label'],
               state.get('nextTurfNumber'));

  return state
    .update('nextTurfNumber', inc)
    .set('currentTurf', Utils.feature())
    .updateIn(['turfSet', 'features'], list => list.push(newTurf));
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
