import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
}

export const createEntry = (object: NewDiaryEntry) => {
    return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch((error) => {
      if(axios.isAxiosError(error)) {
        throw error;
      } else {
        console.log(error);
      }
    })

}