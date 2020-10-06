import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import persons from "./services/persons";
import Notification from "./components/Notifications";
import "./index.css";

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
		<div>
			<p>
				{" "}
				{name.name} {name.number}{" "}
				<button
					onClick={() => {
						var result = window.confirm("delete " + name.name + "?");
						if (result === true) {
							personService
								.deleteThis(name.id)

								.then((initialPersons) => {
									console.log(initialPersons);

									personService.getAll().then((initialPersons) => {
										props.setPersons(initialPersons);
										props.setErrorMessage(`Deleted ${name.name} `);
										setTimeout(() => {
											props.setErrorMessage(null);
										}, 5000);
									});

									return;
								});
						} else {
						}
					}}
				>
					delete
				</button>
			</p>
		</div>
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
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showAll, setShowAll] = useState(false);
	const [newName2, setNewName2] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
			console.log(initialPersons);
		});
	}, []);
	const results = persons.filter((name) => name.name === newName);
	if (results.length > 1) {
		setNewName("");

		personService.deleteThis(persons.pop().id).then((initialPersons) => {});

		return alert(newName + " " + "is already added to phonebook");
	}
	const addName = (event) => {
		event.preventDefault();

		const nameObject = {
			name: newName,
			number: newNumber,

			id: persons[persons.length - 1].id + 1,
		};

		if (nameObject.name.length > 0) {
			personService.create(nameObject).then((returnedName) => {
				setPersons(persons.concat(returnedName));
				setNewName("");
				setNewNumber("");
			});
		}
		setErrorMessage(`Added ${nameObject.name} `);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};
	console.log(newName2);
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleNameChange2 = (event) => {
		setNewName2(event.target.value);
	};

	const namesToShow = showAll
		? persons
		: persons.filter((name) => name.name === newName2);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={errorMessage} />
			<Filter
				newName2={newName2}
				handleNameChange2={handleNameChange2}
				namesToShow={namesToShow}
			/>

			<h2>Add a new</h2>
			<PersonForm
				addName={addName}
				newName={newName}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				handleNameChange={handleNameChange}
			/>

			<h2>Numbers</h2>
			{}

			<Names
				persons={persons}
				setPersons={setPersons}
				setErrorMessage={setErrorMessage}
			/>
		</div>
	);
};

export default App;
