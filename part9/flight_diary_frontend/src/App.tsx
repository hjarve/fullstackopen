import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { getAllEntries } from "./services/diaryService";
import { NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() =>{
    getAllEntries().then(data => setDiaryEntries(data))
  }, [])

  return ( 
    <DiaryEntries diaryEntries={diaryEntries}/>
  )
}

export default App
