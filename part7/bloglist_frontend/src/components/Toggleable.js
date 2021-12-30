import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, CancelButton } from '../styles'

const Togglable = React.forwardRef((props,ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	Togglable.propTypes = {
		buttonLabel: PropTypes.string.isRequired
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<>
			<div style={hideWhenVisible}>
				<Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
			</div>
		</>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable