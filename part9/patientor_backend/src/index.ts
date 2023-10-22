import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import cors from 'cors';

const app =express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('We got pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});