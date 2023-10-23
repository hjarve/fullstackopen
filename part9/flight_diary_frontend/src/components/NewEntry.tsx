import { useState } from "react";
import { NonSensitiveDiaryEntry } from "../types";
import { createEntry } from "../services/diaryService";
import Notification from "./Notification";
import axios from 'axios';

interface NewEntryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}


const NewEntry = ({diaryEntries, setDiaryEntries}: NewEntryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      date,
      visibility,
      weather,
      comment
    }


    createEntry(entryToAdd).then(data => {
      if ( data ) {
        setDiaryEntries(diaryEntries.concat({
        id: data.id,
        date: data.date,
        visibility: data.visibility,
        weather: data.weather
      }))
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      }
    }).catch((error) => {
      if(axios.isAxiosError(error)){
        showErrorMessage(error.response?.data) ;
      }
      console.log(error);
    }) 
      
    
  }

  return(
    <div>
      <h2>Add a new entry</h2>
      <Notification message={errorMessage}/>
      <form onSubmit={onSubmit}>
        <div> date
          <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div> visibility
          <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div> weather
          <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div> comment
          <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewEntry;