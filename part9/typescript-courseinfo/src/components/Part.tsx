import React from 'react';
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

interface PropTypes {
	part: CoursePart
}

const Part = ({ part }: PropTypes): JSX.Element => {
	// Exhaustive type checking based on type property
	switch (part.type) {
	case 'normal':
		return (
			<p key={part.name}>
				<b>{part.name} {part.exerciseCount}</b><br />
				{part.description}
			</p>
		);
	case 'groupProject':
		return (
			<p key={part.name}>
				<b>{part.name} {part.exerciseCount}</b><br />
				Project exercises: {part.groupProjectCount}
			</p>
		);
	case 'submission':
		return (
			<p key={part.name}>
				<b>{part.name} {part.exerciseCount}</b><br />
				{part.description}<br />
				Submit to {part.exerciseSubmissionLink}
			</p>
		);
		break;
	case 'special':
		return (
			<p key={part.name}>
				<b>{part.name} {part.exerciseCount}</b><br />
				{part.description}<br />
				Required skills: {part.requirements.join(', ')}
			</p>
		);
	default:
		return <>{assertNever(part)}</>;
	}
};


export default Part;