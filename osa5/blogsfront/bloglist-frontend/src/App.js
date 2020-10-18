import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";
import LoginForm from "./components/LoginForm";
import Togglalbe from "./components/Togglalbe";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loginVisible, setLoginVisible] = useState(false);
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
	const addBlog = (event) => {
		event.preventDefault();
		console.log(newTitle);
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			id: blogs.length + 1,
		};
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			setNewTitle("");
			setNewAuthor("");
			setNewUrl("");
		});

		setErrorMessage(`Added ${blogObject.title}`);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};
	const handleTitleChange = (event) => {
		setNewTitle(event.target.value);
	};
	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value);
	};
	const handleUrlChange = (event) => {
		setNewUrl(event.target.value);
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
	const blogForm = () => {
		const hideWhenVisible = { display: loginVisible ? "none" : "" };
		const showWhenVisible = { display: loginVisible ? "" : "none" };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>new blog</button>
				</div>
				<div style={showWhenVisible}>
					<h2>Create new</h2>
					<form onSubmit={addBlog}>
						title: <input value={newTitle} onChange={handleTitleChange} />{" "}
						<br></br>
						author: <input
							value={newAuthor}
							onChange={handleAuthorChange}
						/>{" "}
						<br></br>
						url: <input value={newUrl} onChange={handleUrlChange} /> <br></br>
						<button type="submit">create</button>
					</form>
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</div>
		);
	};

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
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}

			{blogForm()}
		</div>
	);
};

export default App;
