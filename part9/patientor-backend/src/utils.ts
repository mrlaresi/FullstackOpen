/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { diagnoseCodes } from '../data/diagnoses';
import { Discharge, EntryType, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, SickLeave } from './types';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const isEntryType = (entry: any): entry is EntryType => {
	return Object.values(EntryType).includes(entry);
};

const isValidCodes = (array: Array<unknown>): array is Array<string> => {
	const bools = array.map((value) => {
		const found = diagnoseCodes.find((code) => code === value);
		if (!found) return false;
		return true;
	});
	if (bools.includes(false)) {
		return false;
	}
	return true;
};

const isHealtCheckRating = (rating: any): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(rating);
};

const isDischarge = (discharge: any): discharge is Discharge => {
	return 'date' in discharge && 'criteria' in discharge
		&& isDate(discharge.date) && isString(discharge.criteria);
};

const isSickLeave = (leave: any): leave is SickLeave => {
	return 'startDate' in leave && 'endDate' in leave
		&& isDate(leave.startDate) && isDate(leave.endDate);
};

const parseString = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error(`Incorrect or missing value: ${name}`);
	}
	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing date: ${date}`);
	}
	return date;
};

const parseGender = (gender: unknown) => {
	if (!gender || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender: ${gender}`);
	}
	return gender;
};

const parseEntryType = (entry: unknown): EntryType => {
	if (!entry || !isEntryType(entry)) {
		throw new Error(`Incorrect or missing entry type: ${entry}`);
	}
	return entry;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[] | undefined): Array<string> | undefined => {
	if (!diagnosisCodes) return undefined;
	if (!diagnosisCodes || !isValidCodes(diagnosisCodes)) {
		throw new Error(`Incorrect or missing diagnosis codes: ${diagnosisCodes}`);
	}
	return diagnosisCodes;
};

const parseHealthCheckRating = (rating: unknown): number => {
	if (rating === undefined || !isHealtCheckRating(rating)) {
		throw new Error(`Incorrect or missing health check rating: ${rating}`);
	}
	return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || !isDischarge(discharge)) {
		throw new Error(`Incorrect or missing discharge`);
	}
	return discharge;
};

const parseSickLeave = (leave: unknown | undefined): SickLeave | undefined => {
	if (!leave) return undefined;
	if (!leave || !isSickLeave(leave)) {
		throw new Error(`Incorrect or missing sick leave`);
	}
	return leave;
};

type PatientFields = {
	name: unknown,
	ssn: unknown,
	dateOfBirth: unknown,
	occupation: unknown,
	gender: unknown,
	entries: Array<unknown>
};
type EntryFields = {
	type: unknown,
	description: unknown,
	date: unknown,
	specialist: unknown,
	diagnosisCodes?: Array<unknown>,
	healthCheckRating: unknown,
	discharge: unknown,
	employerName: unknown,
	sickLeave: unknown | undefined
};

export const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }: PatientFields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseString(name),
		ssn: parseString(ssn),
		dateOfBirth: parseDate(dateOfBirth),
		occupation: parseString(occupation),
		gender: parseGender(gender),
		entries: []
	};
	return newPatient;
};

const toNewBaseEntry = (input: EntryFields): NewBaseEntry => {
	const newEntry = {
		type: parseEntryType(input.type),
		description: parseString(input.description),
		date: parseDate(input.date),
		specialist: parseString(input.date),
		diagnosisCodes: parseDiagnosisCodes(input.diagnosisCodes),
	};
	return newEntry;
};

export const toNewEntry = (input: EntryFields): NewEntry => {
	const newEntry = toNewBaseEntry(input) as NewEntry;
	switch (newEntry.type) {
	case EntryType.Hospital:
		newEntry.discharge = parseDischarge(input.discharge);
		return newEntry;
	case EntryType.HealthCheck:
		newEntry.healthCheckRating = parseHealthCheckRating(input.healthCheckRating);
		return newEntry;
	case EntryType.OccupationalHealthcare:
		newEntry.employerName = parseString(input.employerName);
		newEntry.sickLeave = parseSickLeave(input.sickLeave);

		return newEntry;
	default:
		return assertNever(newEntry);
	}

};

export default toNewPatient;