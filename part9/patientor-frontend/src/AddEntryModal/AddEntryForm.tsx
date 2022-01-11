import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, EntryTypeSelection, TextField, TypeSpecificFields } from "../Modal/FormField";
import { useStateValue } from "../state";
import { EntryFormValues, EntryType, HealthCheckRating, NewEntry } from "../types";
import { isDate, toNewEntry } from "../utils";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeaveStart: "",
        sickLeaveEnd: "",
        dischargeDate: "",
        dischargeCriteria: ""
      }}
      onSubmit={(values: EntryFormValues) => onSubmit(toNewEntry(values))}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Invalid date";
        const errors: { [field: string]: string } = {};
        if (!isDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        switch (values.type) {
          case EntryType.Hospital:
            if (!isDate(values.dischargeDate)) {
              errors.dischargeDate = dateError;
            }
            if (!values.dischargeCriteria) {
              errors.dischargeCriteria = requiredError;
            }
            break;
          case EntryType.HealthCheck:
            break;
          case EntryType.OccupationalHealthcare:
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeaveStart && !isDate(values.sickLeaveStart)) {
              errors.sickLeaveStart = dateError;
            }
            if (values.sickLeaveEnd && !isDate(values.sickLeaveEnd)) {
              errors.sickLeaveEnd = dateError;
            }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <EntryTypeSelection
              entryTypes={Object.values(EntryType)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField} 
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
            <TypeSpecificFields type={values.type}/>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;