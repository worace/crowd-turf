import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import {connect} from 'react-redux';
import Utils from '../utils';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

const staticFeatureColl = {
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
              -118.31228256225585,
              34.04640127074641
            ],
            [
              -118.271427154541,
              34.04640127074641
            ],
            [
              -118.271427154541,
              34.063752280364135
            ],
            [
              -118.31228256225585,
              34.063752280364135
            ],
            [
              -118.31228256225585,
              34.04640127074641
            ]
          ]
        ]
      }
    }
  ]
};

const staticFeature = {
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'LineString',
    'coordinates': [
      [
        -118.25365635987487,
        34.04636852454928
      ],
      [
        -118.27116582032383,
        34.03669592496327
      ],
      [
        -118.23182103273771,
        34.028444894815976
      ],
      [
        -118.25331303712098,
        34.04665299607224
      ],
      [
        -118.26120946046069,
        34.043239274811384
      ]
    ]
  }
};
    // [

    //   [
    //     [
    //       -118.31228256225585,
    //       34.04640127074641
    //     ],
    //     [
    //       -118.271427154541,
    //       34.04640127074641
    //     ],
    //     [
    //       -118.271427154541,
    //       34.063752280364135
    //     ],
    //     [
    //       -118.31228256225585,
    //       34.063752280364135
    //     ],
    //     [
    //       -118.31228256225585,
    //       34.04640127074641
    //     ]
    //   ]
    // ]

class Map extends Component {
  currentFeature() {
    if (this.props.currentFeature.geometry.coordinates.length > 0) {
      return (
        <GeoJSONLayer
          linePaint={{'line-color': '#000000'}}
          fillPaint={{'fill-color': '#000000', 'fill-opacity': 0.5}}
          data={this.props.currentFeature} />
      );
    }
    return null;
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <ReactMapboxGl
          // eslint-disable-next-line
          style='mapbox://styles/mapbox/basic-v9'
          accessToken={MapboxToken}
          center={this.props.center}
          containerStyle={{height: '100vh', width: '100vw'}}
          onMove={this.props.mapMove}
          onClick={this.props.mapClick} >
          {this.currentFeature()}
        </ReactMapboxGl>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    center: state.get('center').toJS(),
    currentFeature: state.get('currentFeature').toJS()
  };
}

function dispatchToProps(dispatch) {
  return {
    mapClick: (map, event) => {
      dispatch({type: 'POINT_ADDED',
                payload: Utils.coordinate(event.lngLat)});
    },
    mapMove: (map) => {
      dispatch({type: 'MAP_MOVED',
                payload: Utils.coordinate(map.getCenter())});
    }
  };
}

export default connect(stateToProps, dispatchToProps)(Map);
