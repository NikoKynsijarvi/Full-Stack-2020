const { request } = require("express");
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
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
	const names = persons.map((name) => name.name);
	const a = names.filter((n) => n === body.name);
	console.log(a);
	if (a.length > 0) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});

var d = new Date();
var n = d.toString();
console.log(n);
app.get("/info", (req, res) => {
	res.send(`<div><p>Phonebook has info for ${persons.length} persons </p>
    <p>${n} </p>
    <div>`);
});

app.get("/api/persons", (req, res) => {
	res.json(persons);
});
app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
