import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const handleTitleChange = (event) => {
		setNewTitle(event.target.value);
	};
	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value);
	};
	const handleUrlChange = (event) => {
		setNewUrl(event.target.value);
	};
	const addBlog = (event) => {
		event.preventDefault();
		console.log(newTitle);
		createBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			id: blogs.length + 1,
		};

		setNewTitle("");
		setNewUrl("");
		setNewAuthor("");

		setErrorMessage(`Added new blog`);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};
	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={addBlog}>
				title: <input value={newTitle} onChange={handleTitleChange} /> <br></br>
				author: <input value={newAuthor} onChange={handleAuthorChange} />{" "}
				<br></br>
				url: <input value={newUrl} onChange={handleUrlChange} /> <br></br>
				<button type="submit">create</button>
			</form>
		</div>
	);
};
export default BlogForm;
