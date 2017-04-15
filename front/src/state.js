import Imm from 'immutable';

function featureCollection() {
  return Imm.Map({
    'type': 'FeatureCollection',
    'features': []
  });
}

const initialState = Imm.Map({
  center: Imm.Map({latitude: 34.0522, longitude: -118.2437}),
  currentFeatureSet: featureCollection(),
  currentFeature: null
});

export default initialState;
