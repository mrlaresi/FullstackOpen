import React from "react"

const BlogForm = ({ handleCreate, title, setTitle, author, setAuthor, url, setUrl }) => {
	return (
		<div>
			<h4>Create new blog</h4>
			<form onSubmit={handleCreate}>
				<p>Title: <input value={title} type="text"
					onChange={({ target }) => setTitle(target.value)} />
				</p>
				<p>Author: <input value={author} type="text"
					onChange={({ target }) => setAuthor(target.value)} />
				</p>
				<p>Url: <input value={url} type="text"
					onChange={({ target }) => setUrl(target.value)} />
				</p>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}

export default BlogForm