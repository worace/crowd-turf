import Imm from 'immutable';

const initialState = Imm.Map({
  center: Imm.Map({latitude: 34.0522, longitude: -118.2437}),
  currentFeature: {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [
                -118.27983856201172,
                34.04569008803844
              ],
              [
                -118.26009750366211,
                34.04569008803844
              ],
              [
                -118.26009750366211,
                34.060197034932095
              ],
              [
                -118.27983856201172,
                34.060197034932095
              ],
              [
                -118.27983856201172,
                34.04569008803844
              ]
            ]
          ]
        }
      }
    ]
  }
});

export default initialState;
