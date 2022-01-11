import React from "react";
import { useStateValue } from "../state";

interface PropTypes {
  diagnosisCodes: Array<string> | undefined
}

const DiagnosisDetail = ({ diagnosisCodes }: PropTypes) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnosisCodes) return <></>;
  return (
    diagnoses && Object.keys(diagnoses).length > 0
      ? <ul>
        {diagnosisCodes.map((diagnosis) =>
          <li key={diagnosis}>{diagnosis}: {diagnoses[diagnosis].name}</li>
        )}
      </ul>
      : <></>
  );
};

export default DiagnosisDetail;