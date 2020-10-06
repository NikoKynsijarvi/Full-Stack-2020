import React from "react";
import Name from "./name";

const Filter = (props) => (
	<div>
		<form>
			<div>
				filter with:
				<input value={props.newName2} onChange={props.handleNameChange2} />
			</div>
		</form>
		<ul>
			{props.namesToShow.map((name) => (
				<Name key={name.name} name={name} />
			))}
		</ul>
	</div>
);

export default Filter;
