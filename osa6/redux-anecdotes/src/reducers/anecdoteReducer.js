import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
	console.log("state now: ", state);
	console.log("action", action);
	if (action.type === "VOTE") {
		const id = action.data.id;

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
	return {
		type: "VOTE",
		data: { id },
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({
			type: "NEW_ANECODTE",
			votes: 0,
			data: newAnecdote,
		});
	};
};
export const filter = (filter) => {
	return {
		type: "FILTER",
		data: { filter },
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes,
		});
	};
};

export default anecdoteReducer;
