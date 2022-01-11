import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<NonSensitivePatient> => {
	return patientData.map((patient) => {
		return { ...patient, ssn: undefined, entries: undefined };
	});
};

const getPatient = (id: string): Patient | undefined => {
	return patientData.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
	const id: string = uuid();
	const addedPatient = { ...newPatient, id: id };
	patientData.push(addedPatient);
	return addedPatient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry | undefined => {
	const id: string = uuid();
	const patientToUpdate = patientData.find((p) => p.id === patientId);
	if (!patientToUpdate) {
		throw Error(`Patient doesn't exist`);
	}
	const addedEntry = { ...newEntry, id };
	patientToUpdate?.entries.push(addedEntry);
	return addedEntry;
};

const exported = {
	getPatients,
	getPatient,
	addPatient,
	addEntry
};

export default exported;