export const isNotNumber = (arg: unknown): boolean => {
  return isNaN(Number(arg));
}