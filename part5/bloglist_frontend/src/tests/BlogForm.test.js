import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm React Component', () => {
  test('Creating new blog calls callback with correct parameters', () => {
    const handleCreate = jest.fn()
    const component = render(
      <BlogForm handleCreate={handleCreate} />
    )
    const form = component.container.querySelector('form')
    const title = component.getByTestId('inputTitle')
    const author = component.getByTestId('inputAuthor')
    const url = component.getByTestId('inputUrl')
    fireEvent.change(title, {
      target: { value: 'Tester' }
    })
    fireEvent.change(author, {
      target: { value: 'Tester Testington' }
    })
    fireEvent.change(url, {
      target: { value: 'test.xyz' }
    })
    fireEvent.submit(form)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0].title).toBe('Tester')
    expect(handleCreate.mock.calls[0][0].author).toBe('Tester Testington')
    expect(handleCreate.mock.calls[0][0].url).toBe('test.xyz')
  })
})