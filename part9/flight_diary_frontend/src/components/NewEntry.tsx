import { useState } from "react";
import { NonSensitiveDiaryEntry, Weather, Visibility } from "../types";
import { createEntry } from "../services/diaryService";
import Notification from "./Notification";
import axios from 'axios';

interface NewEntryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}


const NewEntry = ({diaryEntries, setDiaryEntries}: NewEntryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
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
    if ( !visibility ) {
      showErrorMessage('You must choose visibility!');
      return;
    }
    if ( !weather ) {
      showErrorMessage('You must choose weather!');
      return;
    }
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
      setVisibility(null);
      setWeather(null);
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
          <input type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div> visibility
          <input required type="radio"
            id="great"
            name="visibility"
            value='great'
            checked={visibility === 'great'}
            onChange={() => setVisibility('great' as Visibility)}
            />
          <label htmlFor="great">great</label>
          <input type="radio"
            id="good"
            name="visibility"
            value='good'
            checked={visibility === 'good'}
            onChange={() => setVisibility('good'as Visibility)}
            />
          <label htmlFor="good">good</label>
          <input type="radio"
            id="ok"
            name="visibility"
            value='ok'
            checked={visibility === 'ok'}
            onChange={() => setVisibility('ok'as Visibility)}
            />
          <label htmlFor="ok">ok</label>
          <input type="radio"
            id="poor"
            name="visibility"
            value='poor'
            checked={visibility === 'poor'}
            onChange={() => setVisibility('poor'as Visibility)}
            />
          <label htmlFor="poor">poor</label>
        </div>
        <div> weather
        <input required type="radio"
            id="sunny"
            name="weather"
            value='sunny'
            checked={weather === 'sunny'}
            onChange={() =>setWeather('sunny' as Weather)}
            />
          <label htmlFor="sunny">sunny</label>
          <input type="radio"
            id="rainy"
            name="weather"
            value='rainy'
            checked={weather === 'rainy'}
            onChange={() =>setWeather('rainy' as Weather)}
            />
          <label htmlFor="rainy">rainy</label>
          <input type="radio"
            id="cloudy"
            name="weather"
            value='cloudy'
            checked={weather === 'cloudy'}
            onChange={() =>setWeather('cloudy' as Weather)}
            />
          <label htmlFor="cloudy">cloudy</label>
          <input type="radio"
            id="stormy"
            name="weather"
            value='stormy'
            checked={weather === 'stormy'}
            onChange={() =>setWeather('stormy' as Weather)}
            />
          <label htmlFor="stormy">stormy</label>
          <input type="radio"
            id="windy"
            name="weather"
            value='windy'
            checked={weather === 'windy'}
            onChange={() =>setWeather('windy' as Weather)}
            />
          <label htmlFor="windy">windy</label>
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