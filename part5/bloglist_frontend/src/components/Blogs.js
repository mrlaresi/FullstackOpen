import React from "react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import ErrorNotification from "./ErrorNotification"

const Blogs = (props) => {
	return (
		<div>
			<h2>blogs</h2>
			<ErrorNotification message={props.message} isError={props.isError} />
			<p>{props.user} logged in 
				<button onClick={props.handleLogout}>Logout</button>
			</p>
			<BlogForm {...props} />
			{props.blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default Blogs