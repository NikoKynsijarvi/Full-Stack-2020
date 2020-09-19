import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040 1234567", id: 1 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showAll, setShowAll] = useState(true);

	const names = persons.map((name) => (
		<p>
			{" "}
			{name.name} {name.number}
		</p>
	));

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		console.log(nameObject.name);

		setPersons(persons.concat(nameObject));

		setNewName("");
		setNewNumber("");
	};
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const results = persons.filter((name) => name.name === newName);
	if (results.length > 0) {
		return alert(newName + " " + "is already added to phonebook");
	}
	const namesToShow = showAll ? persons : persons.filter((name) => name.name);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<h2>Add a new</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>

				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{}

			{names}
		</div>
	);
};

export default App;
