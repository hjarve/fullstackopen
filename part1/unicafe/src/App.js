import { useState } from "react";

const Header = ({text}) => <h2>{text}</h2>;

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
};

const Statistic = ({text, statNum}) => <p>{text} {statNum}</p>

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

  return (
    <div>
      <Header text={'Give feedback'} />
      <Button onClick={increaseGood} text = {goodText} />
      <Button onClick={increaseNeutral} text = {neutralText} />
      <Button onClick={increaseBad} text = {badText} />
      <Header text={'Statistics'} />
      <Statistic text={goodText} statNum = {good} />
      <Statistic text={neutralText} statNum = {neutral} />
      <Statistic text={badText} statNum = {bad} />
    </div>
  )
};

export default App;
