import express from 'express';
import { isNotNumber } from './utils/isNotNumber';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const  { height } = req.query;
  const { weight } = req.query;
  if (!height || !weight){
    res.status(400).json({ error: 'parameters missing'});
  } else if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: '"malformatted parameters"'});
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({height, weight, bmi});
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  const daily_exercises_parsed = JSON.parse(daily_exercises)
  
  if( !daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing'})
  } else if ( isNotNumber(target) || daily_exercises_parsed.some((d: unknown) => isNotNumber(d))) {
    res.status(400).json({ error: "malformatted parameters"})
  }

  const daily_exercises_nums = daily_exercises_parsed.map((d: unknown) => Number(d));
  const result = calculateExercises(daily_exercises_nums, Number(target), )
  res.send(result);
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})