const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs");

	response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response) => {
	const body = request.body;

	console.log(body);

	if (!body.username) {
		return response.status(400).json({ error: "username required" });
	}
	if (!body.password) {
		return response.status(400).json({ error: "password required" });
	}
	if (body.username.length < 3) {
		return response
			.status(400)
			.json({ error: "username must be atleast 3 digits" });
	}
	if (body.password.length < 3) {
		return response
			.status(400)
			.json({ error: "password must be atleast 3 digits" });
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.json(savedUser);
});

module.exports = usersRouter;
