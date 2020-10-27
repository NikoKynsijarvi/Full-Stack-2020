const notificationReducer = (state = { text: "" }, action) => {
	if (action.type === "VOTE") {
		state = { text: "Voted anecdote " };

		return state.text;
	}
	if (action.type === "INIT_ANECDOTES") {
		state = { text: "Added new anecdote" };
		return state.text;
	}
	if (action.type === "REMOVE_NOTIFICATION") {
		state = { text: "" };
		return state.text;
	} else return null;
};

export const removeNotification = () => {
	return {
		type: "REMOVE_NOTIFICATION",
	};
};

export default notificationReducer;
