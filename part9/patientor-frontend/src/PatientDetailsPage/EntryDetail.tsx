import React from "react";
import { Entry, EntryType } from "../types";
import HealthCheck from "./HealthCheck";
import HospitalEntry from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PropTypes {
  entry: Entry
}

const EntryDetail = ({ entry }: PropTypes) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;