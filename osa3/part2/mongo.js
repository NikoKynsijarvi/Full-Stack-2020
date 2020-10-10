/*eslint-env es6*/
const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://niko123:${password}@cluster0.ypivi.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
	name: process.argv[3],
	number: process.argv[4],
});

if (process.argv[3] && process.argv[4] != null) {
	person.save().then((response) => {
		console.log(
			`added ${process.argv[3]} number ${process.argv[4]} to phonebook`
		);
		mongoose.connection.close();
	});
} else {
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person.name, person.number);
			mongoose.connection.close();
		});
	});
}
