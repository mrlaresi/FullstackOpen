const listHelper = require('../utils/list_helper')

const noBlog = []
const oneBlog = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	}
]
const twoBlogs = [
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 2,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]
const listOfBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 2,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]


test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})


describe('total likes', () => {
	test('of many blogs equals to total likes', () => {
		const result = listHelper.totalLikes(listOfBlogs)
		expect(result).toBe(38)
	})

	test('of one blog equals to the likes of that', () => {
		const result = listHelper.totalLikes(oneBlog)
		expect(result).toBe(7)
	})

	test('of empty list is 0', () => {
		const result = listHelper.totalLikes(noBlog)
		expect(result).toBe(0)
	})
})


describe('favorite blog', () => {
	test('equals the blog with most likes', () => {
		const result = listHelper.favoriteBlog(listOfBlogs)
		expect(result).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		})
	})

	test('of two blogs with same likes equals to the first blog', () => {
		const result = listHelper.favoriteBlog(twoBlogs)
		expect(result).toEqual({
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			likes: 2,
		})
	})

	test('of one blog equals to itself', () => {
		const result = listHelper.favoriteBlog(oneBlog)
		expect(result).toEqual({
			title: 'React patterns',
			author: 'Michael Chan',
			likes: 7,
		})
	})

	test('of zero blogs equals to undefined', () => {
		const result = listHelper.favoriteBlog([])
		expect(result).toEqual(undefined)
	})
})


describe('most blogs', () => {
	test('equals to author with most blogs', () => {
		const result = listHelper.mostBlogs(listOfBlogs)
		expect(result).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})

	test('one blog equals to one', () => {
		const result = listHelper.mostBlogs(oneBlog)
		expect(result).toEqual({
			author: 'Michael Chan',
			blogs: 1
		})
	})

	test('zero blocks equals to undefined', () => {
		const result = listHelper.mostBlogs(noBlog)
		expect(result).toEqual(undefined)
	})
})


describe('most likes', () => {
	test('equals to author with most likes', () => {
		const result = listHelper.mostLikes(listOfBlogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})

	test('one blog equals to itself', () => {
		const result = listHelper.mostLikes(oneBlog)
		expect(result).toEqual({
			author: 'Michael Chan',
			likes: 7,
		})
	})

	test('no blog equals to undefined', () => {
		const result = listHelper.mostLikes(noBlog)
		expect(result).toEqual(undefined)
	})
})