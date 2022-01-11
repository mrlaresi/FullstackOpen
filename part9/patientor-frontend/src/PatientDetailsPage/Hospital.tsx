import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import DiagnosisDetail from "./DiagnosisDetail";

interface PropTypes {
  entry: HospitalEntry
}

const Hospital = ({ entry }: PropTypes) => {
  return (
    <Segment>
      <h3>{entry.date} <Icon name="hospital" size="large" /></h3>
      <p>{entry.description}</p>
      <DiagnosisDetail diagnosisCodes={entry.diagnosisCodes} />
      <p>Discharged on {entry.discharge.date}:</p>
      <p>Reason: {entry.discharge.criteria}</p>
    </Segment>
  );
};

export default Hospital;