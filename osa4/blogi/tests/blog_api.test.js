const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);
const Blog = require("../models/blogs");

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
});
test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});
test("blogs id is checked", async () => {
	const id = await api.get("/api/blogs");
	console.log(id.body);

	expect(id.body[0].id).toBeDefined();
});
test("a valid blog can be added ", async () => {
	const initialBlogs = await api.get("/api/blogs");
	const newBlog = {
		author: "Tonny Sinneli",
		url: "url",
		likes: 0,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	console.log(response.body.length);
	console.log(initialBlogs.body.length + 1);

	expect(response.body.length) === initialBlogs.body.length + 1;
});
test("Check if likes is set ", async () => {
	const initialBlogs = await api.get("/api/blogs");
	const newBlog = {
		author: "Tonny Sinneli",
		url: "url",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");

	expect(response.body[response.body.length - 1].likes).toBeDefined();
});
test("A blog without title or url will not be added", async () => {
	const newBlog = {
		likes: 7,
	};
	const initialBlogs = await api.get("/api/blogs");
	await api.post("/api/blogs").send(newBlog).expect(400);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});
afterAll(() => {
	mongoose.connection.close();
});
