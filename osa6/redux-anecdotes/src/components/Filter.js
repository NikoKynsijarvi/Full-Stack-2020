import React from "react";
import { filter } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	console.log(anecdotes, "Tässä");
	const dispatch = useDispatch();

	console.log(anecdotes, "Joo");
	const handleChange = (event) => {
		const filterValue = event.target.value;
		console.log(filterValue, "Filter value");

		const n = anecdotes.filter((element) => {
			const a = element.content;
			return a.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
		});

		dispatch(filter(n));
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div>
			<div style={style}>
				filter <input onChange={handleChange} />
			</div>
		</div>
	);
};

export default Filter;
