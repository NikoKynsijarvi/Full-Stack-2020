import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from "./reducers/anecdoteReducer";
import reducer from "./reducers/anecdoteReducer";

const store = createStore(reducer);

//const store = createStore(reducer, composeWithDevTools());

export default store;
