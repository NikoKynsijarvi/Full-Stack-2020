import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = (props) => (
	<div>
		<h1>{props.name}</h1>
		{props.capital}
		{props.population}
		<h1>languages</h1>
		{props.languages}
		{props.flag}
	</div>
);

const App = () => {
	const [newCountry, setNewCountry] = useState("");
	const [countries, setCountry] = useState([]);

	const name = newCountry;

	useEffect(() => {
		//console.log("effect");
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			//console.log("promise fulfilled");
			setCountry(response.data);
		});
	}, []);

	useEffect(() => {
		//console.log("effect");
		axios.get("https://weatherstack.com/").then((response) => {
			//console.log("promise fulfilled");
			setCountry(response.data);
		});
	}, []);

	const handleCountryChange = (event) => {
		setNewCountry(event.target.value);
	};
	const addCountry = (event) => {
		event.preventDefault();
		const countryObject = {
			country: newCountry,
		};

		setCountry(countries.concat(countryObject));

		setNewCountry("");
	};

	const countryName = countries.map((name) => name.name);
	const capitals = countries.map((capital) => capital.capital);
	const countrysPopula = countries.map((population) => population.population);
	const countrysLanguage = countries.map((langua) => langua.languages);
	const countrysFlag = countries.map((flag) => flag.flag);

	const indeksi = countryName.indexOf(name);

	const kieli = countrysLanguage[indeksi];

	const nameLower = countryName.filter((element) => {
		const newName = element.toLowerCase();
		return newName.toLowerCase().indexOf(newCountry.toLowerCase()) > -1;
	});
	console.log(nameLower);
	const nation = countryName[indeksi];

	const capital = (
		<div>
			<p>capital {capitals[indeksi]}</p>
		</div>
	);
	const population = (
		<div>
			<p>population {countrysPopula[indeksi]}</p>
		</div>
	);
	const flag = (
		<div>
			<object>
				<img
					src={countrysFlag[indeksi]}
					alt="Flag"
					width="150"
					height="100"
				></img>
			</object>
		</div>
	);

	if (indeksi > 0) {
		const languages = (
			<div>
				{kieli.map((name) => (
					<div>
						<ul>
							<li>{name.name}</li>
						</ul>
					</div>
				))}
			</div>
		);
		return (
			<div>
				<form onSubmit={addCountry}>
					<div>
						find countries{" "}
						<input value={newCountry} onChange={handleCountryChange} />
					</div>
				</form>
				{nameLower}
			</div>
		);
	} else
		return (
			<div>
				<form onSubmit={addCountry}>
					<div>
						find countries{" "}
						<input value={newCountry} onChange={handleCountryChange} />
					</div>
				</form>
				{nameLower}
			</div>
		);
};

export default App;
