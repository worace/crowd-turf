export default {
  pointTuple: ({latitude, longitude}) => [longitude, latitude],
  coordinate: ({lng, lat}) => ({longitude: lng, latitude: lat})
};

