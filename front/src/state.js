import Imm from 'immutable';
import Utils from './utils';

const initialState = Imm.Map({
  turfSet: Utils.featureCollection(),
  currentTurf: Utils.feature(),
  hoverFeature: Utils.feature(),
  nextTurfNumber: 1
});

export default initialState;
