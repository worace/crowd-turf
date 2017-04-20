import Imm from 'immutable';

function polygon(properties, coordinates) {
  return Imm.fromJS({
    'type': 'Feature',
    properties,
    'geometry': {
      'type': 'Polygon',
      coordinates
    }
  });
}

function multiPolygon(properties, coordSets) {
  return Imm.fromJS({
    'type': 'Feature',
    properties,
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': Imm.List(coordSets)
    }
  });
}

function mergeFeatureCollection(properties, featureColl) {
  const coordSets = featureColl
        .get('features')
        .map(f => f.getIn(['geometry', 'coordinates']));

  if (coordSets.size > 1) {
    return multiPolygon(properties, coordSets);
  } else {
    return polygon(properties, coordSets.first());
  }
}

export default { mergeFeatureCollection };
