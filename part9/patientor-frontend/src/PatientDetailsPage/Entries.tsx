import React from "react";
import { useStateValue } from "../state";
import EntryDetail from "./EntryDetail";

const Entries = () => {
  const [{ patient }] = useStateValue();

  return (
    patient
      ? <><h4>Entries</h4>
        {patient?.entries.map((entry) =>
          <EntryDetail key={entry.id} entry={entry} />
        )}
      </>
      : <></>
  );
};

export default Entries;