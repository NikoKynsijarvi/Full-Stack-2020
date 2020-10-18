import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import blogs from "../services/blogs";
const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		paddingBottom: 10,
	};

	const [blogVisible, setBlogVisible] = useState(false);
	const hideWhenVisible = { display: blogVisible ? "none" : "" };
	const showWhenVisible = { display: blogVisible ? "" : "none" };
	return (
		<div style={blogStyle}>
			<div style={showWhenVisible}>
				{blog.title}
				<button onClick={() => setBlogVisible(false)}>hide</button>
				<br></br>
				{blog.author} <br></br>
				{blog.url} <br></br>
				likes: {blog.likes} <button>like</button>
			</div>
			<div style={hideWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={() => setBlogVisible(true)}>view</button>
			</div>
		</div>
	);
};

export default Blog;
