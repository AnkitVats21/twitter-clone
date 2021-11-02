import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import logger from "redux-logger";
import thunk from 'redux-thunk';
import auth from "./reducers/auth";

const rootReducer = combineReducers({
    auth,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;