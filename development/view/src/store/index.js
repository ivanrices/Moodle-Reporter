import  { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './../reducers';
import config from '../config';

const initialState = {
    menuReducer: {isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false,} // static can't change
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//recibe reducers
export const store = createStore(reducer, initialState,
    composeEnhancers(applyMiddleware(promiseMiddleware)));