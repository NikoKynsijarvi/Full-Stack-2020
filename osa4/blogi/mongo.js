const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://niko123:${password}@cluster0.ypivi.mongodb.net/blogi?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
	content: "Test Blog",
	author: "Niksu",
	url: "testi url",
	likes: 3,
});

blog.save().then((response) => {
	console.log("blog saved!");
	mongoose.connection.close();
});
