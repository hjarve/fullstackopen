import patientData from '../../data/patients';
import { PatientWithoutSsn } from '../types';

const getEntries = (): PatientWithoutSsn[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getEntries };