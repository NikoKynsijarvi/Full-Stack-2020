import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = (props) => (
	<div>
		<h1>{props.nameLower}</h1>
		<p>capital {props.capital}</p>
		<p>population {props.population}</p>

		<h1>languages</h1>
		{props.languages}
		{props.flag}
	</div>
);
const CountryForm = (props) => (
	<form onSubmit={props.addCountry}>
		<div>
			find countries{" "}
			<input value={props.newCountry} onChange={props.handleCountryChange} />
		</div>
	</form>
);
const App = () => {
	const [newCountry, setNewCountry] = useState("");
	const [countries, setCountry] = useState([]);

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			console.log("promise fulfilled");
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

	const nameLower = countryName.filter((element) => {
		const newName = element;
		return newName.toLowerCase().indexOf(newCountry.toLowerCase()) > -1;
	});
	const indeksi = countryName.indexOf(nameLower[0]);

	const kieli = countrysLanguage[indeksi];

	const capital = capitals[indeksi];

	const population = countrysPopula[indeksi];
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

	if (nameLower.length === 1) {
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
				<CountryForm
					addCountry={addCountry}
					newCountry={newCountry}
					handleCountryChange={handleCountryChange}
				/>
				<Result
					nameLower={nameLower}
					capital={capital}
					population={population}
					languages={languages}
					flag={flag}
				/>
			</div>
		);
	} else if (nameLower.length < 10) {
		return (
			<div>
				<CountryForm
					addCountry={addCountry}
					newCountry={newCountry}
					handleCountryChange={handleCountryChange}
				/>

				{nameLower.map((v) => (
					<div> {v}</div>
				))}
			</div>
		);
	} else
		return (
			<div>
				<CountryForm
					addCountry={addCountry}
					newCountry={newCountry}
					handleCountryChange={handleCountryChange}
				/>

				<p>Too many matches, specify another filter</p>
			</div>
		);
};

export default App;
