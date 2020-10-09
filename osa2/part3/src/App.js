import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notifications";
import PersonForm from "./components/personform";
import Filter from "./components/filter";
import "./index.css";

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

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [showAll, setShowAll] = useState(false);
	const [newName2, setNewName2] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
			console.log(initialPersons);
		});
	}, []);
	const results = persons.filter((name) => name.name === newName);
	console.log(results);
	if (results.length > 1) {
		setNewName("");
		var nimet = persons.map((name) => name.name);
		console.log(results);
		personService.deleteThis(persons.pop().id).then((initialPersons) => {});
		var id = results[0].id;
		console.log(id);
		var r = window.confirm(
			newName +
				" " +
				"is already added to phonebook, replace old number with a new one?"
		);
		if (r === true) {
			var nameObject = {
				name: newName,
				number: newNumber,
				id: id,
			};
			personService.update(id, nameObject).then((initialPersons) => {
				personService.getAll().then((initialPersons) => {
					setPersons(initialPersons);
				});
			});
			setErrorMessage(
				`Changed ${nameObject.name} number to ${nameObject.number} `
			);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
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
				newName2={newName2}
			/>
		</div>
	);
};

export default App;
