import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
	res.json(patientService.getPatients());
});

patientRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const patient = patientService.getPatient(id);
	if (!patient) {
		res.status(400).send('Invalid patient');
		return;
	}
	res.json(patient);
});

patientRouter.post('/', (req, res) => {
	try {
		// Validation
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (e) {
		let errorMessage = 'Something went wrong.';
		if (e instanceof Error) {
			errorMessage += ' Error: ' + e.message;
		}
		res.status(400).send(errorMessage);
	}
});

patientRouter.post('/:id/entries', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newEntry = toNewEntry(req.body.entry);
		const id = req.body.id as string;
		const addedEntry = patientService.addEntry(id, newEntry);
		res.json(addedEntry);
	} catch (e) {
		let errorMessage = 'Something went wrong';
		if (e instanceof Error) {
			errorMessage += ' Error: ' + e.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientRouter;