require("dotenv").config();
/*eslint-env es6*/
var request = require("express");
const express = require("express");
const cors = require("cors");
const Person = require("./models/person");
const app = express();
var morgan = require("morgan");

const mongoose = require("mongoose");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("content", (request) => {
	if (request.method === "POST") {
		return JSON.stringify(request.body);
	} else {
		return;
	}
});
app.use(morgan(":method :url :status :response-time ms :content"));

var d = new Date();
var n = d.toString();
console.log(n);
app.get("/info", (req, res) => {
	Person.find({}).then((persons) => {
		res.send(`<div><p>Phonebook has info for ${persons.length} persons </p>
		<p>${n} </p>
		<div>`);
	});
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
		console.log(persons);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	const { id } = request.params;
	Person.findById(id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});
app.post("/api/persons", (request, response, next) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	}
	if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			console.log(`added ${body.name} number ${body.number} to phonebook`);
			return savedPerson.toJSON();
		})
		.then((savedAndFormattedPerson) => {
			response.json(savedAndFormattedPerson);
		})
		.catch((error) => next(error));
});
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
