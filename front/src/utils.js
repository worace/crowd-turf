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

export default {
  coordinate: ({lng, lat}) => [lng, lat],
  featureCollection: () => {
    return Imm.fromJS({
      'type': 'FeatureCollection',
      'features': []
    });
  },
  feature
};

