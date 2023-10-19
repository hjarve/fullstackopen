
const calculateBmi = (heightInCm: number, weightInKg: number): string  => {
  if ( isNaN(heightInCm) || isNaN(weightInKg)) {
    throw new Error('Height and weight must be numbers!');
  }
  if ( heightInCm <= 0 || weightInKg <= 0 ) {
    throw new Error('Height and weight must be greater than zero!')
  }
  
  const bmi = weightInKg/((heightInCm/100) ** 2)
  if ( bmi < 18.5 ){
    return 'undeweight'
  } else if ( bmi > 24.9 ) {
    if( bmi < 30 ){
      return 'overweight'
    }
    return 'obese'
  } else {
    return 'Normal (normal weight)'
  }
}

const heightInCm: number = Number(process.argv[2]);
const weightInKg: number = Number(process.argv[3]);

try{
  console.log(calculateBmi(heightInCm, weightInKg));
} catch ( error: unknown) {
  let errorMessage = 'There is an error: ';
  if ( error instanceof Error ) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
