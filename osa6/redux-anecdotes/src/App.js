import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { voteFor, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteFor(id));
	};

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		dispatch(createAnecdote(content));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{console.log(anecdotes)}
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default App;
