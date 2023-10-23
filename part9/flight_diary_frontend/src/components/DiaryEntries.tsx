import { NonSensitiveDiaryEntry } from "../types";
import DiaryEntry from "./DiaryEntry";


const DiaryEntries = ({diaryEntries}: {diaryEntries: NonSensitiveDiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(e => <DiaryEntry key={e.id} entry={e}/>)}
    </div>
  )
}

export default DiaryEntries;