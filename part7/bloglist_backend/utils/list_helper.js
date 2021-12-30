const dummy = (blogs) => {
	blogs[0]
	return 1
}

const totalLikes = (blogs) => {
	let likes = blogs.reduce((likes, curr) => {
		return likes + curr.likes
	}, 0)
	return likes
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return undefined
	}
	let highestLikes = blogs.reduce((prev, curr) => {
		return prev.likes < curr.likes ? curr : prev
	})
	let favorite = {
		'title': highestLikes.title,
		'author': highestLikes.author,
		'likes': highestLikes.likes
	}
	return favorite
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return undefined
	}
	// fetch authors
	let blog = blogs.map((blog) => blog.author)

	// count blogs per author
	let blogsPerAuthor = blog.reduce((acc, curr) => {
		acc[curr] ? acc[curr]++ : acc[curr] = 1
		return acc
	}, {})

	// get author with most blogs
	let countedBlogs = Object.entries(blogsPerAuthor).reduce((prev, curr) => {
		return prev[1] < curr[1] ? curr : prev
	})

	return {
		'author': countedBlogs[0],
		'blogs': countedBlogs[1]
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return undefined
	}
	let authors = blogs.map((blog) => blog.author)
	let uniqueAuthors = Object.assign(
		...Array.from(
			[...new Set(authors)], key => ( { [key]: 0 } )
		)
	)

	blogs.reduce((acc, curr) => {
		uniqueAuthors[curr.author]
			? acc[curr.author] += curr.likes
			: acc[curr.author] = curr.likes
		return uniqueAuthors
	}, uniqueAuthors)

	let countedLikes = Object.entries(uniqueAuthors).reduce((prev, curr) => {
		return prev[1] < curr[1] ? curr : prev
	})

	return {
		'author': countedLikes[0],
		'likes': countedLikes[1]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}