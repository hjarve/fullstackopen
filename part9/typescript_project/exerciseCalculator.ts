interface ReturnObj {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

interface exerciseValues {
  value1: number;
  value2: number[];
}

const parseArgs = (args: string[]) : exerciseValues => {
  if ( args.length < 4 ) throw new Error('Not enough armguments!');
  const value1 = Number(args[2]);
  const value2String = args.slice(3);
  const value2 = value2String.map(d => Number(d));
  if ( isNaN(value1) || value2.some((value) => isNaN(value))) {
    throw new Error('All the parameters must be numbers!');
  }
  if (value1 <= 0 ) {
    throw new Error('Target must be greater than zero!');
  }
  if (!value2.every((value) => value >= 0)){
    throw new Error('Exercise hours must be greater than zero!');
  }
  return { value1, value2 };
}

const calculateExercises = (dailyHours: number[], origTarget: number): ReturnObj => {
  const periodLength= dailyHours.length;
  let trainingDays = 0;
  dailyHours.map(d => d > 0 ? trainingDays+=1 : null)
  const target= origTarget;

  const totalHours = dailyHours.reduce((total, value) => total + value );
  const average = totalHours / periodLength;
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
    periodLength: periodLength,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: success,
    rating: rating,
    ratingDescription: description
  });
}


try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateExercises(value2, value1));
} catch ( error: unknown) {
  let errorMessage = 'There is an error: ';
  if ( error instanceof Error ) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
