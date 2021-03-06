import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import initialState from './state';
import reducers from './reducers';

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
});

export default createStore(reducers,
                           initialState);
                           // applyMiddleware(logger)
