import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import { prettyDOM } from "@testing-library/dom";

const blog = {
	author: "Markku",
	title: "Joku title",
	url: "www.moikkamoi.fi",
	likes: 2,
};

test("renders only title and author by default", () => {
	const component = render(<Blog blog={blog} />);
	component.debug();

	expect(component.container).toHaveTextContent(blog.title);
	expect(component.container).toHaveTextContent(blog.author);

	expect(component.container).not.toHaveTextContent(blog.url);
	expect(component.container).not.toHaveTextContent(blog.likes);
});

test("renders only title and author by default", () => {
	const component = render(<Blog blog={blog} />);
	const button = component.getByText("view");

	fireEvent.click(button);
	component.debug();

	expect(component.container).toHaveTextContent(blog.title);
	expect(component.container).toHaveTextContent(blog.author);

	expect(component.container).toHaveTextContent(blog.url);
	expect(component.container).toHaveTextContent(blog.likes);
});
test("like is pressed twice causes two onLiked events", () => {
	const component = render(<Blog blog={blog} />);
	const button = component.getByText("view");

	fireEvent.click(button);
	const button2 = component.getByText("like");

	fireEvent.click(button2);
	fireEvent.click(button2);

	expect(mockHandlerUpdate.mock.calls).toHaveLength(2);
});
