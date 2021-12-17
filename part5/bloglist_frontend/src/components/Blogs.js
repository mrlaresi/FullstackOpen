import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import ErrorNotification from './ErrorNotification'
import Togglable from './Toggleable'

const Blogs = (props) => {
  return (
    <>
      <h2>Blogs</h2>
      <ErrorNotification message={props.message} isError={props.isError} />
      <p>{props.user.name} logged in
        <button onClick={props.handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={props.blogFormRef}>
        <BlogForm handleCreate={props.handleCreate} />
      </Togglable>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={props.handleLike} handleDelete={props.handleDelete} user={props.user} />
      )}
    </>
  )
}

export default Blogs