import React from 'react';
import { CoursePart } from '../types';

interface PropTypes {
	courseParts: Array<CoursePart>
}

const Total = ({ courseParts }: PropTypes): JSX.Element => {
	return (
		<p>
			Number of exercises{' '}
			{courseParts.reduce((sum, current) => {
				return sum + current.exerciseCount;
			}, 0)}
		</p>
	);
};

export default Total;