import { useState } from "react";

const Header = ({text}) => <h2>{text}</h2>;

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
};

const StatisticLine = ({text1, statNum, text2}) => <tr><td>{text1}</td><td>{statNum} {text2}</td></tr>

const Statistics = (props) => {
  if(props.totalNum == 0) {
    return <p>No feedback given</p>
  } else {
    return(
      <table>
        <StatisticLine text1={props.goodText} statNum={props.goodNum} />
        <StatisticLine text1={props.neutralText} statNum={props.neutralNum} />
        <StatisticLine text1={props.badText} statNum={props.badNum} />
        <StatisticLine text1={'all'} statNum={props.totalNum} />
        <StatisticLine text1={'average'} statNum={props.averageNum} />
        <StatisticLine text1={'positive'} statNum={props.positiveProp} text2={'%'} />
      </table>
    )
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'good';
  const neutralText = 'neutral';
  const badText = 'bad';

  // functions to record the number of clicks for each option
  const increaseGood = () => setGood(good +1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  // functions to calculate statistics
  const countTotal = () => good + neutral + bad;
  const countAverage = () => (good - bad) / countTotal();
  const positiveProportion = () => (good / countTotal()) * 100;

  return (
    <div>
      <Header text={'Give feedback'} />
      <Button onClick={increaseGood} text = {goodText} />
      <Button onClick={increaseNeutral} text = {neutralText} />
      <Button onClick={increaseBad} text = {badText} />
      <Header text={'Statistics'} />
      <Statistics goodText={goodText} goodNum = {good} neutralText={neutralText} neutralNum={neutral}
        badText={badText} badNum={bad} totalNum={countTotal()} averageNum={countAverage()} positiveProp={positiveProportion()}/>
    </div>
  )
};

export default App;
