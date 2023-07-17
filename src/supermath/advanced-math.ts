export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error('nope');
  }

  return a / b;
}
