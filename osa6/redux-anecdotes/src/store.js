import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from "./reducers/anecdoteReducer";

import notificationReducer from "./reducers/NotificationReducer";
import filterReducer from "./reducers/filterReducer";

//const store = createStore(reducer);
const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
});
const store = createStore(reducer);
//const store = createStore(reducer, composeWithDevTools());

export default store;
