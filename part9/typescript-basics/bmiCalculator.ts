interface ParsedValues {
	height: number;
	weight: number;
}

const calculateBmi = (height: number, mass: number): string => {
	const bmi = mass / ((height / 100) * (height / 100));
	if (bmi < 16.0) return 'Underweight (severe thinness)';
	if (bmi < 17.0) return 'Underweight (moderate thinness';
	if (bmi < 18.5) return 'Underweight (mild thinness)';
	if (bmi < 25.0) return 'Normal (healthy weight)';
	if (bmi < 30.0) return 'Overweight (pre-obese';
	if (bmi < 35.0) return 'Obese (class I)';
	if (bmi < 40.0) return 'Obese (class II)';
	if (bmi >= 40.0) return 'Obese (class III)';
	return `Did you try dividing with 0? bmi value ${bmi}`;
};

const parseArguments = (args: Array<string>): ParsedValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	const height = Number(args[2]);
	const weight = Number(args[3]);
	if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers');

	return { height, weight };
};

if (require.main === module) {
	try {
		const { height, weight } = parseArguments(process.argv);
		console.log(calculateBmi(height, weight));
	} catch (e) {
		console.log(e.message);
	}
}

export default calculateBmi;