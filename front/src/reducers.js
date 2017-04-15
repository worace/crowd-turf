import Utils from './utils';
import Imm from 'immutable';

function updateFeature(previous, pointTuple) {
  if (previous) {
    return previous.updateIn(['geometry', 'coordinates'],
                             list => list.push(pointTuple));
  } else {
    return Imm.fromJS({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Polygon',
        'coordinates': [pointTuple]
      }
    });
  }
}

function pointAdded(state, action) {
  const pointTuple = Imm.List(Utils.pointTuple(action.payload));
  return state.update('currentFeature', prev => updateFeature(prev, pointTuple));
}

const ActionHandlers = {
  POINT_ADDED: pointAdded
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
