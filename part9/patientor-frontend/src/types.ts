export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Array<Entry>
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export interface SickLeave {
	startDate: string,
	endDate: string;
}

export interface Discharge {
	date: string,
	criteria: string;
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
	Hospital = 'Hospital',
	HealthCheck = 'HealthCheck',
	OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface HealthCheckEntry extends BaseEntry {
	type: EntryType.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: EntryType.OccupationalHealthcare;
	employerName: string;
	sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
	type: EntryType.Hospital;
	discharge: Discharge;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewEntry = 
	| Omit<HospitalEntry, "id">
	| Omit<HealthCheckEntry, "id">
	| Omit<OccupationalHealthcareEntry, "id">;

export interface EntryFormValues {
	type: EntryType;
	date: string;
	description: string;
	specialist: string;
	diagnosisCodes: Array<Diagnosis["code"]>;
	healthCheckRating: HealthCheckRating;
	employerName: string;
	sickLeaveStart: string;
	sickLeaveEnd: string;
	dischargeDate: string;
	dischargeCriteria: string;
}