import { useState } from "react";

const Header = ({text}) => <h2>{text}</h2>;

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
};

const Statistic = ({text1, statNum, text2}) => <p>{text1} {statNum} {text2}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'good';
  const neutralText = 'neutral';
  const badText = 'bad';

  const increaseGood = () => setGood(good +1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

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
      <Statistic text1={goodText} statNum={good} />
      <Statistic text1={neutralText} statNum={neutral} />
      <Statistic text1={badText} statNum={bad} />
      <Statistic text1={'all'} statNum={countTotal()} />
      <Statistic text1={'average'} statNum={countAverage()} />
      <Statistic text1={'positive'} statNum={positiveProportion()} text2={'%'} />
    </div>
  )
};

export default App;
