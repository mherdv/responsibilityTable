import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import reducers from './reducers';
/* eslint-disable no-underscore-dangle */




const composeEnhancers =

    // google chrome redux connection 
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||

    compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


/* eslint-enable */
export default store;