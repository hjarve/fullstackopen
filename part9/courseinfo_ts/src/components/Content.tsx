import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({courseParts}: { courseParts: CoursePart[]}) => {
  return(
    courseParts.map((p, index) => <Part key={index} coursePart={p}/>
    )
  )
}

export default Content;