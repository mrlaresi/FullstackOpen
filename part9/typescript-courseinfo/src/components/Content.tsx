import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface PropTypes {
	courseParts: Array<CoursePart>
}

const Content = ({ courseParts }: PropTypes): JSX.Element => {
	return (
		<div>
			{courseParts.map((part) =>
				<Part key={part.name} part={part}/>
			)}
		</div>
	);
};

export default Content;