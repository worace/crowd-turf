import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import pp from 'pretty-immutable';
import initialState from './state';
import reducers from './reducers';

const logger = createLogger({
  stateTransformer: (state) => pp(state)
});

export default createStore(reducers,
                           initialState,
                           applyMiddleware(logger));
