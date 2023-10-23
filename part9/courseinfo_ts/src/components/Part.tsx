import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  switch ( coursePart.kind ) {
    case "basic":
      return(
        <div>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <i>{coursePart.description}</i>
        </div>
      )
    case "group":
      return (
        <div>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <i>{coursePart.description}</i>
          <p>{coursePart.backgroundMaterial}</p>
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;