import { useEffect, useState } from "react";
import PatientService from '../services/patients';
import { Patient } from "../types";
import { useParams } from "react-router-dom";


const PatientDetails = ()  => {
  const id = useParams().id as string;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const fetchedPatient = await PatientService.getPatient(id);
      setPatient(fetchedPatient);
    };
    fetchPatient(id);
  }, [id]);

  return(
    <div>
      <h2>{patient?.name}</h2>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientDetails;