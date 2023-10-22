import { newPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
  if( !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(str);
};

const parseGender = (gender: unknown): Gender => {
  if( !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const toNewPatient = (object: unknown): newPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'gender' in object && 'ssn' in object && 'occupation' in object && 'dateOfBirth' in object) {
    const newPatient: newPatient = {
        name: parseString(object.name),
        gender: parseGender(object.gender),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth)
      };
    return newPatient; 
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;