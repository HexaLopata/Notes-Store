import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers/appReducer/appReducer';
import { authReducer } from './reducers/authReducer/authReducer';
import { noteReducer } from './reducers/noteReducer/noteReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    notes: noteReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))