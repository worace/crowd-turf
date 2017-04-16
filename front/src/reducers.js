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
  // First and last point need to be the same for a "LinearRing"
  // if (coords.size === 0) {
  //   // return previous.setIn(keypath, Imm.List([coords, coords]));
  // } else {
  //   return previous.updateIn(keypath,
  //                            list => {
  //                              return list.take(list.size - 1)
  //                                .push(coords)
  //                                .push(list.first());
  //                            });
  // }
}

function pointAdded(state, action) {
  const coords = Imm.List(action.payload);
  return state.update('currentFeature', prev => updateFeature(prev, coords));
}

const ActionHandlers = {
  POINT_ADDED: pointAdded,
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
