export function sum(a: number, b: number) {
  return a + b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  if (b === 0) {
    return 'Undefined';
  } else {
    return a / b;
  }
}

export function mod(a: number, b: number) {
  return a % b;
}

export function exponent(a: number, b: number) {
  return a ** b;
}

export function root(a: number, b: number) {
  if ((a < 0 && b % 2 === 0) || b === 0) {
    return 'Undefined';
  } else if (a < 0) {
    return -Math.pow(-a, 1 / b);
  } else {
    return Math.pow(a, 1 / b);
  }
}

export function log(a: number, b: number) {
  if (a <= 0 || b <= 0 || b === 1) {
    return 'Undefined';
  } else {
    return Math.log(a) / Math.log(b);
  }
}