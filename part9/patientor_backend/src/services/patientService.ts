import patientData from '../../data/patients';
import { PatientWithoutSsn, Patient } from '../types';
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

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
  const newPatientEnrty = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  patients.push(newPatientEnrty);
  return newPatientEnrty;
};

export default { 
  getEntries,
  addPatient,
};