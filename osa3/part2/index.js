const { request } = require("express");
const express = require("express");
require("dotenv").config();
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

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

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5334523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122",
	},
];

const generateId = () => {
	const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	return maxId + 1;
};

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
app.get("/info", (req, res) => {
	Person.find({}).then((persons) => {
		res.send(
			`<div>
	  <span>Phonebook has info for ${persons.length} people</span></div>
	<span>${new Date().toString()}</span>`
		);
	});
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons.map((person) => person.toJSON()));
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
app.post("/api/persons", (request, response) => {
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

	const a = persons.filter((n) => n === body.name);
	console.log(a);
	if (a.length > 0) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const person = new Person({
		id: generateId(),
		name: body.name,
		number: body.number,
	});

	person.save().then((savedNote) => {
		console.log(`added ${body.name} number ${body.number} to phonebook`);
		response.json(savedNote.toJSON());
	});
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
