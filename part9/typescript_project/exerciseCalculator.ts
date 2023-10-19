interface ReturnObj {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (dailyHours: number[], origTarget: number): ReturnObj => {
  if ( isNaN(origTarget) || dailyHours.some((value) => isNaN(value))) {
    throw new Error('All the parameters must be numbers!');
  }
  if (origTarget <= 0 ) {
    throw new Error('Target must be greater than zero!');
  }
  if (!dailyHours.every((value) => value >= 0)){
    throw new Error('Exercise hours must be greater than zero!');
  }
  if (dailyHours.length === 0 ) {
    throw new Error('No daily hours provided.')
  }
  
  const periodLenth= dailyHours.length;
  let trainingDays = 0;
  dailyHours.map(d => d > 0 ? trainingDays+=1 : null)
  const target= origTarget;

  const totalHours = dailyHours.reduce((total, value) => total + value );
  const average = totalHours / periodLenth;
  const success = average >= target;

  let rating : 1 | 2 | 3 = 2;
  let description = "Great, you reached your target!";
  const rate = average / target;
  if( rate < 1) {
    rating = 1;
    description = "Unfortunately you didn't reach your target";
  }
  else if (rate > 1.2) {
    rating = 3;
    description = "You over exceeded yourself!";
  }

  return ({
    periodLength: periodLenth,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: success,
    rating: rating,
    ratingDescription: description
  });
}

const target: number = Number(process.argv[2])
const daysString: string[] = process.argv.slice(3);
const days: number[] = daysString.map(d => Number(d));

try {
  console.log(calculateExercises(days, target));
} catch ( error: unknown) {
  let errorMessage = 'There is an error: ';
  if ( error instanceof Error ) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
