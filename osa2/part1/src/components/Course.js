import React from "react";

const Course = ({ courses }) => {
	var contents = courses.map(function (content) {
		return (
			<div>
				<h1>{content.name}</h1>

				{content.parts.map((part) => (
					<p>
						{part.name} {part.exercises}
					</p>
				))}
				<p>
					<strong>
						{" "}
						total of{" "}
						{content.parts.reduce(function (sum, number) {
							return sum + number.exercises;
						}, 0)}{" "}
						exercises
					</strong>
				</p>
			</div>
		);
	});

	return <div>{contents}</div>;
};

export default Course;
