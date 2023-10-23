import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): NonSensitivePatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const foundPatient = patients.find(p => p.id === id);
  return foundPatient;
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
  findById,
  addPatient,
};