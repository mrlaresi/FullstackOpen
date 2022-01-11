import { BaseEntry, EntryFormValues, EntryType, NewEntry } from "./types";

type NewBaseEntry = Omit<BaseEntry, 'id'>;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const toNewEntry = (values: EntryFormValues): NewEntry => {
  const type = values.type;
  const newBaseEntry: NewBaseEntry = {
    description: values.description,
    date: values.date,
    specialist: values.specialist,
    diagnosisCodes: values.diagnosisCodes,
  };

  switch (type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria,
        }
      };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: values.healthCheckRating,
      };
    case EntryType.OccupationalHealthcare:
      if (values.sickLeaveStart === '' && values.sickLeaveEnd === '') {
        return {
          ...newBaseEntry,
          type,
          employerName: values.employerName,
        };  
      }
      return {
        ...newBaseEntry,
        type,
        employerName: values.employerName,
        sickLeave: {
          startDate: values.sickLeaveStart,
          endDate: values.sickLeaveEnd,
        },
      };
    default:
      return assertNever(type);
  }

};