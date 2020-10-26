const anecdoteReducer = (state = [], action) => {
	console.log("state now: ", state);
	console.log("action", action);
	if (action.type === "VOTE") {
		const id = action.data.id;
		console.log("äänestit");
		const aToChange = state.find((n) => n.id === id);
		const changedA = {
			...aToChange,
			votes: aToChange.votes + 1,
		};
		return state
			.map((anecdote) => (anecdote.id !== id ? anecdote : changedA))
			.sort((a, b) => b.votes - a.votes);
	}
	if (action.type === "NEW_ANECDOTE") {
		console.log(action, "action");
		return [...state, action.data];
	}
	if (action.type === "FILTER") {
		console.log(action.data.filter);
		return (state = action.data.filter);
	}
	if (action.type === "INIT_ANECDOTES") {
		return action.data;
	} else return state;
};
export const voteFor = (id) => {
	console.log("vote", id);
	return {
		type: "VOTE",
		data: { id },
	};
};
export const createAnecdote = (data) => {
	return {
		type: "NEW_ANECDOTE",
		votes: 0,
		data,
	};
};
export const filter = (filter) => {
	return {
		type: "FILTER",
		data: { filter },
	};
};
export const initializeAnecdotes = (anecdotes) => {
	return {
		type: "INIT_ANECDOTES",
		data: anecdotes,
	};
};

export default anecdoteReducer;
