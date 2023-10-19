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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));