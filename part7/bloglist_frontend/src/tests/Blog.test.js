import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog React element', () => {
	let component
	const user = {
		name: 'Tester the Testington',
		username: 'testington'
	}
	const blog = {
		title: 'Test title',
		author: 'Tester',
		url: 'test.xyz',
		likes: 2,
		user: user
	}
	const handleLike = jest.fn()
	const handleDelete = () => { }

	beforeEach(() => {
		component = render(
			<Blog blog={blog}
				handleLike={handleLike}
				handleDelete={handleDelete}
				user={user} />
		)
	})


	test('renders only title and author by default', () => {
		const div = component.container.querySelector('.blog')
		expect(div).toHaveTextContent('Test title by Tester')
		expect(div).not.toHaveStyle('display: none')
		const hiddenDiv = component.container.querySelector('.hiddenContent')
		expect(hiddenDiv).toHaveStyle('display: none')
	})

	test('url and likes are rendered after button press', () => {
		const button = component.container.querySelector('#visibilityButton')
		fireEvent.click(button)
		const hiddenDiv = component.container.querySelector('.hiddenContent')
		expect(hiddenDiv).toHaveStyle('display: block')
		expect(hiddenDiv).toHaveTextContent(
			'test.xyzLikes: 2'
		)
	})

	test('pressing like twice calls event handler twice', () => {
		const button = component.getByText('Like')
		fireEvent.click(button)
		fireEvent.click(button)
		expect(handleLike.mock.calls).toHaveLength(2)
	})
})