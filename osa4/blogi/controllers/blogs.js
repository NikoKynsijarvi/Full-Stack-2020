const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs.map((blog) => blog.toJSON()));
});

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

	const blog = new Blog({
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	const savedBlog = await blog.save();
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
