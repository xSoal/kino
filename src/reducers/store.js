

import { combineReducers, createStore, applyMiddleware  } from 'redux';
import hallsReducer from './hallsReducer';
import daysNavigationReducer from './daysNavigationReducer';
import timelineReducer from './timelineReducer';
import mouseReducer from './mouseReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


let reducers = {
    hallsState: hallsReducer,
    daysNavigationState:  daysNavigationReducer,
    timelineState: timelineReducer,
    mouseState: mouseReducer
};




const store = createStore(
    combineReducers(reducers), 
    composeWithDevTools(applyMiddleware(ReduxThunk))
);


window.store = store


export default store;