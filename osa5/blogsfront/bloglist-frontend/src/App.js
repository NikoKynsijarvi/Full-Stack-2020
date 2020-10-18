import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	blogs.sort(function (a, b) {
		return b.likes - a.likes;
	});
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log("logging in with", username, password);
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			setErrorMessage(`Logged in as ${user.name}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		} catch (exception) {
			setErrorMessage("Wrong username or password");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handeLogout = async (event) => {
		setErrorMessage("Logged out");
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
		event.preventDefault();
		window.localStorage.removeItem("loggedBlogappUser");

		setUser(null);
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const addBlog = (blogObject) => {
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
		});
		setErrorMessage(`Added ${blogObject.title}`);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const blogForm = () => <BlogForm createBlog={addBlog} />;

	if (user === null) {
		return (
			<div>
				<Notification message={errorMessage} />
				<h2>Log in to application</h2>
				{loginForm()}
			</div>
		);
	}

	return (
		<div>
			<Notification message={errorMessage} />
			<h2>blogs</h2>
			<div>
				<p>
					user: {user.name} logged in{" "}
					<button type="submit" onClick={handeLogout}>
						logout
					</button>
				</p>
			</div>
			{blogForm()}
			{blogs.map((blog) => (
				<div>
					<Blog
						key={blog.id}
						blog={blog}
						setBlogs={setBlogs}
						setErrorMessage={setErrorMessage}
					/>
				</div>
			))}
		</div>
	);
};

export default App;
