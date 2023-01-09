// renders the name of the course
const Header = (props) => {
  return(
    props.course
  )
};

// renders the parts and their number of exercises
const Part = (props) => {
  return(
    <p>
        {props.part} {props.exercises}
      </p>
  )
};

// renders the part components
const Content= (props) => {
  return(
    <div>
      <Part part = {props.part1} exercises = {props.exercises1} />
      <Part part = {props.part2} exercises = {props.exercises2} />
      <Part part = {props.part3} exercises = {props.exercises3} />
    </div>
  )
};

// renders the total number of exercises
const Total= (props) => {
  return(
    <p>Number of exercises {props.num1 + props.num2 + props.num3}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2}
        part3 = {part3} exercises3 = {exercises3} />
      <Total num1 = {exercises1} num2 = {exercises2} num3 = {exercises3}/>
    </div>
  );
}

export default App;
