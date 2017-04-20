import Imm from 'immutable';
import Utils from './utils';

const feature = Imm.fromJS({
  'type': 'Feature',
  'properties': {
    id: 'starter-feature',
    index: 0
  },
  'geometry': {
    'type': 'MultiPolygon',
    'coordinates': [  // multiple polygons
      [ // single polygon
        [ // linear ring
          [ // coord pair
            -118.58932256698608,
            34.394073596180135
          ],
          [
            -118.58882904052734,
            34.394073596180135
          ],
          [
            -118.58882904052734,
            34.39441886770851
          ],
          [
            -118.58932256698608,
            34.39441886770851
          ],
          [
            -118.58932256698608,
            34.394073596180135
          ]
        ]
      ]
    ]
  }
});

const initialState = Imm.Map({
  turfSet: Utils.featureCollection().update('features', l => l.push(feature)),
  currentTurf: Utils.feature(),
  hoverFeature: Utils.feature(),
  nextIndex: 1
});

export default initialState;
