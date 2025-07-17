const operators = ['+', '-', '*', '/', '%', '^'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function isOperator(char: string) {
  return operators.includes(char);
}

export function isDigit(char: string) {
  return digits.includes(char);
}

export function hasOpenParen(expr: string) {
  return (expr.match(/\(/g) || []).length > (expr.match(/\)/g) || []).length;
}