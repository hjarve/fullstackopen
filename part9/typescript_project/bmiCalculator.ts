import { isNotNumber } from "./utils/isNotNumber";

interface parsedArgs {
  value1: number;
  value2: number
}

export const parseArgs = (args: string[]): parsedArgs => {
  if (args.length < 4 ) throw new Error('Not enough arguments')
  if ( args.length > 4 ) throw new Error('Too many argumnets');
  if ( !isNotNumber(args[2]) && !isNotNumber(args[3])) {
    const value1 = Number(args[2]);
    const value2 = Number(args[3]);
    if ( value1 <= 0 || value2 <= 0) throw new Error('Height and weight must be greater than zero!');
    return { value1, value2 };
  } else throw new Error('Provided values must are not numbers!');
}

export const calculateBmi = (heightInCm: number, weightInKg: number): string  => {
  const bmi = weightInKg/((heightInCm/100) ** 2)
  if ( bmi < 18.5 ){
    return 'underweight'
  } else if ( bmi > 24.9 ) {
    if( bmi < 30 ){
      return 'overweight'
    }
    return 'obese'
  } else {
    return 'Normal (normal weight)'
  }
}


try{
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch ( error: unknown) {
  let errorMessage = 'There is an error: ';
  if ( error instanceof Error ) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
