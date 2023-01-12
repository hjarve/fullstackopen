const Header = ({ course }) => <h2>{course}</h2>

// display total number of exercises of one course
const Total = ({ sum }) => <h3>Total {sum} of exercises </h3>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

// display parts of one course
const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

// the structure for displaying the information of one course
const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total sum = {course.parts.map(part => part.exercises).reduce((result, item) => result + item)} />
    </div>
  )
};

const Curriculum = ({courses}) => courses.map(course => <Course key={course.id} course={course} />) 

export default Curriculum;