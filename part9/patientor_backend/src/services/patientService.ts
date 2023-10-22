import patientData from '../../data/patients';
import { PatientWithoutSsn, Patient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): PatientWithoutSsn[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const newPatientEnrty = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatientEnrty);
  return newPatientEnrty;
};

export default { 
  getEntries,
  addPatient,
};