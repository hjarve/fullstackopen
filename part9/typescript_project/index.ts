import express from 'express';
import { isNotNumber } from './utils/isNotNumber';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const  { height } = req.query;
  const { weight } = req.query;
  if (!height || !weight){
    res.status(400).json({ error: 'Parameters missing'});
  } else if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: 'Malformatted parameters'});
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({height, weight, bmi});
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})