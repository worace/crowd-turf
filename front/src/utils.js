import Imm from 'immutable';

function multipolygon(...features) {
  debugger;
}

function feature() {
  return Imm.fromJS({
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': []
    }
  });
}

export default {
  coordinate: ({lng, lat}) => [lng, lat],
  featureCollection: () => {
    return Imm.fromJS({
      'type': 'FeatureCollection',
      'features': []
    });
  },
  multipolygon,
  feature
};

