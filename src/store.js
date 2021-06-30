import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers";

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const Store = createStore(
  RootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default Store;
