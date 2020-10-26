const notificationReducer = (state = { text: "" }, action) => {
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
	} else return null;
};
export const voteFor2 = (id) => {
	return {
		type: "VOTE",
		text: "Voted",
		data: { id },
	};
};
export const removeNotification = () => {
	return {
		type: "REMOVE_NOTIFICATION",
	};
};

export default notificationReducer;
