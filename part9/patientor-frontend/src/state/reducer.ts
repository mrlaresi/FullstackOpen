import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: { id: string, entry: Entry}
    }
  | {
      type: "SET_PATIENT";
      payload: Patient | undefined;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}            
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      if (!state.patient || state.patient.id !== action.payload.id) {
        /* should only be reached if program execution gets delayed due to
        bad connection */
        return state;
      }
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: state.patient.entries.concat(action.payload.entry)
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const setDiagnosesList = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { id, entry }
  };
};

export const setPatient = (patient: Patient | undefined): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};
