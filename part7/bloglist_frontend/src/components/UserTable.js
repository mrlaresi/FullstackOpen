import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { H4, Td, Th } from '../styles'

const UserTable = () => {
	const blogs = useSelector(state => state.blogs)
	const users = useSelector(state => state.users)

	return (
		<>
			<H4>Users</H4>
			<table>
				<thead>
					<tr>
						<th></th>
						<Th>Blogs created</Th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						const blogCount = blogs.filter(blog =>
							blog.user.id === user.id).length
						return 	<tr key={user.id}>
							<Td><Link to={`/users/${user.id}`}>{user.name}</Link></Td>
							<Td>{blogCount}</Td>
						</tr>
					}
					)}
				</tbody>
			</table>
		</>
	)
}

export default UserTable