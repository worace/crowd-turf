import Imm from 'immutable';
import Utils from './utils';

const initialState = Imm.Map({
  turfSet: Utils.featureCollection(),
  currentTurf: Utils.feature()
});

export default initialState;
