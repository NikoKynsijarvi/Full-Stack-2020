import React, { useState } from "react";

const PersonForm = (props) => (
	<form onSubmit={props.addName}>
		<div>
			name: <input value={props.newName} onChange={props.handleNameChange} />
		</div>

		<div>
			number:{" "}
			<input value={props.newNumber} onChange={props.handleNumberChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
);

const Names = (props) =>
	props.persons.map((name) => (
		<p>
			{" "}
			{name.name} {name.number}
		</p>
	));

const Name = ({ name }) => {
	return (
		<li>
			{name.name} {name.number}
		</li>
	);
};
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

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040 1234567", id: 1 },
		{ name: "Dan Abramov", number: "39-22-5323523", id: 2 },
		{ name: "Ada Lovelace", number: "050 7676123", id: 3 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showAll, setShowAll] = useState(false);
	const [newName2, setNewName2] = useState("");

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		console.log(newNumber);
		console.log(newName);

		setPersons(persons.concat(nameObject));
		setNewNumber("");
		setNewName("");
	};
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleNameChange2 = (event) => {
		setNewName2(event.target.value);
	};
	const results = persons.filter((name) => name.name === newName);
	if (results.length > 0) {
		return alert(newName + " " + "is already added to phonebook");
	}
	const namesToShow = showAll
		? persons
		: persons.filter((name) => name.name === newName2);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				newName2={newName2}
				handleNameChange2={handleNameChange2}
				namesToShow={namesToShow}
			/>

			<h2>Add a new</h2>

			<h2>Numbers</h2>
			{}

			<PersonForm
				addName={addName}
				newName={newName}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				handleNameChange={handleNameChange}
			/>

			<Names persons={persons} />
		</div>
	);
};

export default App;
