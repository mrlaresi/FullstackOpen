import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const query = req.query;
	const height = Number(query?.height);
	const weight = Number(query?.weight);
	if (isNaN(weight) || isNaN(height)) {
		res.json({ error: 'malformatted parameters' });
		return;
	}

	res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post('/exercises', (req, res) => {
	try {
		if (!req.body.daily_exercises || !req.body.target) {
			res.json({ error: 'parameters missing' });
			return;
		}

		const hours = req.body.daily_exercises;
		const target = Number(req.body.target);
		if (!hours || isNaN(target) || !Array.isArray(hours)) {
			res.json({ error: 'malformatted parameters' });
			return;
		}

		const result = calculateExercises(hours, target);
		res.json({ result });
	} catch (e) {
		console.log(e);

	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});