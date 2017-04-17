import Imm from 'immutable';
import _ from 'lodash';
import pp from 'pretty-immutable';
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
  console.log('*** Save Turf ***');
  const draw = state.get('drawControl');
  console.log('CURRENT:');
  console.log(pp(state.get('currentTurf')));
  draw.deleteAll();

  console.log('CURRENT:');
  console.log(pp(state.get('currentTurf')));

  const newTurf = state
        .get('currentTurf')
        .setIn(['properties', 'label'],
               state.get('nextTurfNumber'));

  console.log('NEW:');
  console.log(pp(newTurf));

  return state
    .update('nextTurfNumber', inc)
    .set('currentTurf', Utils.feature())
    .updateIn(['turfSet', 'features'], list => list.push(newTurf));
}

function excludeFeature(feature, list) {
  const id = feature.getIn(['properties', 'id']);
  return list.filterNot(f => f.getIn(['properties', 'id']) === id);
}

function featureSelected(state, action) {
  const feature = action.payload;
  const draw = state.get('drawControl');
  const featureColl = Utils
        .featureCollection()
        .update('features', l => l.push(feature));

  const featureId = draw.set(featureColl.toJS());
  draw.changeMode(draw.modes.DIRECT_SELECT, {featureId});

  return state
    .set('currentTurf', feature)
    .updateIn(['turfSet', 'features'],
              _.partial(excludeFeature, feature));
}

function featuresUpdated(state, action) {
  const coords = Imm.fromJS(action.payload[0].geometry.coordinates);
  return state.setIn(['currentTurf', 'geometry', 'coordinates', '0'],
                     coords);
}

const ActionHandlers = {
  MAP_LOADED: mapLoaded,
  POLYGON_MODE: polygonMode,
  FEATURES_ADDED: featuresAdded,
  FEATURES_UPDATED: featuresUpdated,
  FEATURE_SELECTED: featureSelected,
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
