const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const totalAmount = blogs.reduce(function (sum, order) {
		return sum + order.likes;
	}, 0);
	return totalAmount;
};

const favoriteBlog = (blogs) => {
	const blog = blogs.map((likes) => likes.likes);
	var maxlikes = Math.max.apply(Math, blog);
	const index = blog.indexOf(maxlikes);
	const favoriteBlog = blogs[index];
	return {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes,
	};
};

const mostBlogs = (blogs) => {
	const authors = blogs.map((author) => author.author);

	const amountOfBlogs = authors.map((author) => {
		const amount = authors.filter((a) => author === a).length;

		const result = {
			author: author,
			blogs: amount,
		};
		return result;
	});
	console.log(amountOfBlogs);
	var i = 0;

	amountOfBlogs.forEach((element, index) => {
		if (element.blogs >= i) {
			i = index;
		}
	});

	return amountOfBlogs[i];
};

const mostLikes = (blogs) => {
	const authors = blogs.map((b) => b.author);

	const numberOfAuthors = authors.filter(
		(item, i, arr) => arr.indexOf(item) === i
	);

	const amountOfLikes = numberOfAuthors.map((author) => {
		const authorBlogs = blogs.filter((blog) => author === blog.author);
		const amount = authorBlogs.reduce((sum, likes) => {
			return sum + likes.likes;
		}, 0);
		const result = {
			author: author,
			likes: amount,
		};
		return result;
	});
	console.log(amountOfLikes);
	var i = 0;
	amountOfLikes.forEach((element, index) => {
		console.log(element.likes + " blogs");
		if (element.likes > i) {
			console.log(index + "index");
			i = index;
		}
	});

	return amountOfLikes[i - 1];
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
