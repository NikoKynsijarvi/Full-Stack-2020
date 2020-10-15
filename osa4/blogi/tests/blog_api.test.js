const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);
const Blog = require("../models/blogs");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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
		title: "title",
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
		title: "testi",
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

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "niksu",
			name: "Niko Koo",
			password: "salainen",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	/*test("creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "root",
			name: "Superuser",
			password: "salainen",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("`username` to be unique");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});*/
});
afterAll(() => {
	mongoose.connection.close();
});
