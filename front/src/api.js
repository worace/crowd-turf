import axios from 'axios';
import Imm from 'immutable';

const API_HOSTS = {
  development: 'http://localhost:9393'
};

// process.env variables are templated in by the webpack
// config; NODE_ENV is one provided by default
const API_BASE = API_HOSTS[process.env.NODE_ENV];

function queryString(map) {
  // given Immutable.Map({lat: 12, lng: 34})
  // produce the querystring '?lat=12&lng=34'
  return '?' + map.entrySeq()
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}

function url(path, params) {
  const qString = params ? queryString(params) : '';
  return API_BASE + path + qString;
}

export default {
  getCanvases: (dispatch) => {
    return axios.get(url('/canvases'))
      .then(resp => Imm.fromJS(resp.data))
      .then(canvases => dispatch({type: 'CANVASES_RECEIVED', payload: canvases}));
  },
  getTurf: (canvasId, dispatch) => {
    return axios.get(url(`/canvases/${canvasId}/turf`))
      .then(resp => Imm.fromJS(resp.data))
      .then(turf => dispatch({type: 'TURF_RECEIVED', payload: turf}));
  }
};
