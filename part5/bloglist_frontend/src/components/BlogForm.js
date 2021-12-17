import React, { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h4>Create new blog</h4>
      <form onSubmit={addBlog}>
        <p>Title: <input data-testid='inputTitle' value={title} type="text"
          onChange={({ target }) => setTitle(target.value)} />
        </p>
        <p>Author: <input data-testid='inputAuthor' value={author} type="text"
          onChange={({ target }) => setAuthor(target.value)} />
        </p>
        <p>Url: <input data-testid='inputUrl' value={url} type="text"
          onChange={({ target }) => setUrl(target.value)} />
        </p>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm