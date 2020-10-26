const initialState = "";

const notificationReducer = (state = initialState, action) => {
	if (action.type === "VOTE") {
		state = { text: "Voted anecdote " };

		return state.text;
	}
	if (action.type === "NEW_ANECDOTE") {
		state = { text: "Added new anecdote" };
		return state.text;
	}
	if (action.type === "REMOVE_NOTIFICATION") {
		state = { text: "" };
		return state.text;
	} else return state;
};

export const removeNotification = () => {
	return {
		type: "REMOVE_NOTIFICATION",
	};
};

export default notificationReducer;
