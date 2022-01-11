interface Exercise {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ParsedValues {
	hours: Array<number>,
	target: number
}

const calculateExercises = (hours: Array<number>, target: number): Exercise => {
	let trainingDays = 0;
	const average = hours.reduce((prev, cur) => {
		if (cur !== 0) trainingDays++;
		return prev + cur;
	}, 0) / hours.length;

	let ratingDescription = 'Invalid inputs: Couldn\'t calculate exercises.';
	let rating = 0;
	if (average / target < 0.7) {
		ratingDescription = 'You didn\'t meet your exercise target :(';
	}
	else if (average / target < 1) {
		rating = 2;
		ratingDescription = 'You just barely didn\'t meet your exercise target. You can do better!';
	}
	else if (average / target >= 1) {
		rating = 3;
		ratingDescription = 'Great job! You met your exercise target!';
	}

	return {
		periodLength: hours.length,
		trainingDays,
		success: average > target,
		rating,
		ratingDescription,
		target,
		average
	};
};

const parseArguments = (args: Array<string>): ParsedValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	const target = Number(args[2]);
	if (isNaN(target)) throw new Error(`Argument wasn't a number: ${args[length-1]}`);

	const hours = [];
	for (let i = 3; i < args.length; i++) {
		const number = Number(args[i]);
		if (isNaN(number)) throw new Error(`Argument wasn't a number: ${args[i]}`);
		hours.push(number);
	}

	return { hours, target };
};

if (require.main === module) {
	try {
		const { hours, target } = parseArguments(process.argv);
		console.log(calculateExercises(hours, target));
	} catch (e) {
		console.log(e.message);
	}
}



export default calculateExercises;