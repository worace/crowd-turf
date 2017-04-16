import Imm from 'immutable';

function featureCollection() {
  return Imm.Map({
    'type': 'FeatureCollection',
    'features': []
  });
}

function feature() {
  return Imm.fromJS({
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': []
    }
  });
}

const initialState = Imm.Map({
  currentFeatureSet: featureCollection()
});

export default initialState;
