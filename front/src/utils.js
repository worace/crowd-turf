import Imm from 'immutable';
import uuid from 'uuid/v4';

function feature() {
  return Imm.fromJS({
    'type': 'Feature',
    'properties': {
      id: uuid()
    },
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': []
    }
  });
}

function featureCollection() {
  return Imm.fromJS({
    'type': 'FeatureCollection',
    'features': []
  });
}

function selectKeys(map, keys) {
  const keySet = Imm.Set(keys);
  return map.filter((v, k) => keySet.has(k));
}

function or(left, right) {
  return left || right;
}

export default {
  coordinate: ({lng, lat}) => [lng, lat],
  featureCollection,
  feature,
  selectKeys
};

