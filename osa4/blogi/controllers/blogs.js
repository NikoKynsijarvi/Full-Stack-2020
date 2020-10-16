const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blogs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;
	if (!body.url) {
		return response.status(400).json({ error: "Bad request" });
	}
	if (!body.title) {
		return response.status(400).json({ error: "Bad request" });
	}

	if (!body.likes) {
		body.likes = 0;
	}
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		author: body.author,
		title: body.title,
		likes: body.likes,
		url: body.url,
	};

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then((updatedBlog) => {
			response.json(updatedBlog);
		})
		.catch((error) => next(error));
});

module.exports = blogsRouter;
