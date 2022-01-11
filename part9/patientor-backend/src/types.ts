export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}


export enum EntryType {
	Hospital = 'Hospital',
	HealthCheck = 'HealthCheck',
	OccupationalHealthcare = 'OccupationalHealthcare'
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
	id: string,
    name: string,
    dateOfBirth: string,
	ssn: string,
    gender: Gender,
    occupation: string,
	entries: Array<Entry>;
}

export interface SickLeave {
	startDate: string,
	endDate: string;
}

export interface Discharge {
	date: string,
	criteria: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>,
	type: EntryType;
}

interface HealthCheckEntry extends BaseEntry {
	type: EntryType.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType.OccupationalHealthcare;
	employerName: string;
	sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
	type: EntryType.Hospital;
	discharge: Discharge;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewEntry =
	| Omit<HospitalEntry, 'id'>
	| Omit<OccupationalHealthcareEntry, 'id'>
	| Omit<HealthCheckEntry, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;