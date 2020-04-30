import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducer from '../redux/reducer/product';
const logger = createLogger();
const enhancer = applyMiddleware(logger, promise)
const store = createStore(reducer, enhancer);
export default store;
