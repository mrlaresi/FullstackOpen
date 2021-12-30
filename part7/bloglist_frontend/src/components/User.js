import React from 'react'
import { useSelector } from 'react-redux'
import { H4, Li, P } from '../styles'

const User = ({ userMatch }) => {
	const userDetails = useSelector(state => state.users)
		.reduce((previous, current) => {
			if (current.id === userMatch.params.id) {
				return current
			}
			return previous
		}, null)

	return (
		<>
			{userDetails
				? <div>
					<H4>{userDetails.name}</H4>
					<P>Added blogs</P>
					<ul>
						{userDetails.blogs.map(blog => {
							return <Li key={blog.id}>{blog.title}</Li>
						})}
					</ul>
				</div>
				: <></>
			}
		</>
	)
}
export default User
