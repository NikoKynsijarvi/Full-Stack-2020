import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
	const [loginVisible, setLoginVisible] = useState(false);
	const hideWhenVisible = { display: loginVisible ? "none" : "" };
	const showWhenVisible = { display: loginVisible ? "" : "none" };

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
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		});

		setNewTitle("");
		setNewAuthor("");
		setNewUrl("");
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => setLoginVisible(true)}>new blog</button>
			</div>
			<div style={showWhenVisible}>
				<h2>Create new</h2>
				<form onSubmit={addBlog}>
					title:{" "}
					<input id="title" value={newTitle} onChange={handleTitleChange} />{" "}
					<br></br>
					author:{" "}
					<input
						id="author"
						value={newAuthor}
						onChange={handleAuthorChange}
					/>{" "}
					<br></br>
					url: <input id="url" value={newUrl} onChange={handleUrlChange} />{" "}
					<br></br>
					<button type="submit">create new blog</button>
				</form>
				<button onClick={() => setLoginVisible(false)}>cancel</button>
			</div>
		</div>
	);
};
BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
