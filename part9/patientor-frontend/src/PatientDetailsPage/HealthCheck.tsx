import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import DiagnosisDetail from "./DiagnosisDetail";

interface PropTypes {
  entry: HealthCheckEntry
}


const HealthCheck = ({ entry }: PropTypes) => {
  const healthCheckRating = (rating: number) => {
    switch (rating) {
      case 0:
        return <Icon name="heartbeat" color="green" />;
      case 1:
        return <Icon name="heartbeat" color="yellow" />;
      case 2:
        return <Icon name="heartbeat" color="orange" />;
      case 3:
        return <Icon name="heartbeat" color="red" />;
      default:
        return null;
    }
  };

  return (
    <Segment>
      <h3>{entry.date} <Icon name="stethoscope" size="large" /></h3>
      <p>{entry.description}</p>
      <DiagnosisDetail diagnosisCodes={entry.diagnosisCodes} />
      {healthCheckRating(entry.healthCheckRating)}
    </Segment>
  );
};

export default HealthCheck;