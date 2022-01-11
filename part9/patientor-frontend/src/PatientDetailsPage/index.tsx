import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon, SemanticICONS } from "semantic-ui-react";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import BaseModal from "../Modal";
import { addEntry, setPatient, useStateValue } from "../state";
import { Entry, NewEntry, Patient } from "../types";
import Entries from "./Entries";

const icons = {
  "male": { name: "mars" as SemanticICONS },
  "female": { name: "venus" as SemanticICONS },
  "other": { name: "genderless" as SemanticICONS }
};

const PatientDetailsPage = () => {
  const [, dispatch] = useStateValue();
  const [{ patient }] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (id && patient?.id !== id) {
      dispatch(setPatient(undefined));
      void fetchPatient();
    }
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (!patient || !patient.id) {
        throw Error(`Patient not loaded`);
      }
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient?.id}/entries`,
        { entry: values, id: patient.id }
      );
      dispatch(addEntry(patient.id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    patient
      ? <div>
        <h2>{patient.name} <Icon {...icons[patient.gender]} size={'big'} /></h2>
        <p>Date of Birth: {patient.dateOfBirth}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <BaseModal
          modalOpen={modalOpen}
          error={error}
          onClose={closeModal}
          title={"Add a new entry"}
          form={<AddEntryForm onSubmit={submitNewEntry} onCancel={closeModal}/>}
        />
        <Button onClick={() => openModal()}>Add a new entry</Button>
        <Entries />
      </div >
      : <p>Invalid patient</p>

  );
};

export default PatientDetailsPage;