
const calculateBmi = (heightInCm: number, weightInKg: number): string  => {
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
console.log(calculateBmi(heightInCm, weightInKg));