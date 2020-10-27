import React from "react";
import ReactDOM from "react-dom";
import anecdoteService from "./services/anecdotes";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteReducer, {
	initializeAnecdotes,
} from "./reducers/anecdoteReducer";

import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
