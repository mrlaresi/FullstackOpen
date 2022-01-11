import express from 'express';
import diagnosesRouter from './routers/diagnoses';
import patientRouter from './routers/patients';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});