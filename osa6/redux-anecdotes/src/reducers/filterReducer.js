const initialState = { filter: "" };

const filterReduce = (state = initialState, action) => {
	if (action.type === "FILTER") {
		console.log(action.data.filter);
		return action.data.filter;
	} else return state;
};
export const filter = (filter) => {
	return {
		type: "FILTER",
		data: { filter },
	};
};

export default filterReduce;
