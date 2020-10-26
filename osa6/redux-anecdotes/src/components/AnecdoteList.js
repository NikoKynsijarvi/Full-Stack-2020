import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { removeNotification } from "../reducers/NotificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	console.log(anecdotes);
	const dispatch = useDispatch();
	const vote = (id) => {
		dispatch(voteFor(id));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
