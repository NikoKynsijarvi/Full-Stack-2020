import React, { useState } from "react";
import blogService from "./../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, setErrorMessage }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		paddingBottom: 10,
	};

	const addLike = (event) => {
		event.preventDefault();
		const blogObject = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		};
		blogService.update(blog.id, blogObject).then((initialBlogs) => {
			blogService.getAll().then((initialBlogs) => {
				setBlogs(initialBlogs);
			});
		});
	};
	const addDislike = (event) => {
		event.preventDefault();
		const blogObject = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes - 1,
		};
		blogService.update(blog.id, blogObject).then((initialBlogs) => {
			blogService.getAll().then((initialBlogs) => {
				setBlogs(initialBlogs);
			});
		});
	};

	const [blogVisible, setBlogVisible] = useState(false);
	const hideWhenVisible = { display: blogVisible ? "none" : "" };
	const showWhenVisible = { display: blogVisible ? "" : "none" };

	if (blogVisible === false) {
		return (
			<div style={hideWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={() => setBlogVisible(true)}>view</button>
			</div>
		);
	}

	console.log(blogVisible);
	return (
		<div style={blogStyle}>
			<div style={showWhenVisible}>
				{blog.title}
				<button onClick={() => setBlogVisible(false)}>hide</button>
				<br></br>
				{blog.author} <br></br>
				{blog.url} <br></br>
				likes: {blog.likes} <button onClick={addLike}>like</button>
				<button onClick={addDislike}>dislike</button>
				<br></br>
				<button
					onClick={() => {
						var result = window.confirm(
							"delete " + blog.title + " by " + blog.author + "?"
						);
						if (result === true) {
							blogService.deleteThis(blog.id).then((initialBlogs) => {
								blogService.getAll().then((initialBlogs) => {
									setBlogs(initialBlogs);
									setErrorMessage(`Deleted ${blog.title} `);
									setTimeout(() => {
										setErrorMessage(null);
									}, 5000);
								});
							});
						}
					}}
				>
					delete
				</button>
			</div>
		</div>
	);
};
Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	setBlogs: PropTypes.func.isRequired,
	setErrorMessage: PropTypes.func.isRequired,
};

export default Blog;
