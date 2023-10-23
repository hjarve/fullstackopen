import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { getAllEntries } from "./services/diaryService";
import { NonSensitiveDiaryEntry } from "./types";
import NewEntry from "./components/NewEntry";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() =>{
    getAllEntries().then(data => setDiaryEntries(data))
  }, [])

  return ( 
    <div>
      <NewEntry diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries}/>
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
    
  )
}

export default App
