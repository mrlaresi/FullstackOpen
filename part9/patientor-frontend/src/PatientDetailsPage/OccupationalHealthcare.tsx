import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisDetail from "./DiagnosisDetail";

interface PropTypes {
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcare = ({ entry }: PropTypes) => {
  return (
    <Segment>
      <h3>{entry.date} <Icon name="user md" size="large" /> {entry.employerName}</h3>
      <p>{entry.description}</p>
      <DiagnosisDetail diagnosisCodes={entry.diagnosisCodes} />
      {entry.sickLeave ? <p>On sick leave from {entry.sickLeave?.startDate} till {entry.sickLeave?.endDate}</p> : null}
    </Segment>
  );
};

export default OccupationalHealthcare;