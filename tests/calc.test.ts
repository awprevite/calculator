import { expect, test } from 'vitest';
import { sum, multiply, divide, mod, exponent, root } from '../src/math';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('adds -1 + 1 to equal 0', () => {
  expect(sum(-1, 1)).toBe(0)
})

test('multiplies 2 * 3 to equal 6', () => {
  expect(multiply(2, 3)).toBe(6)
})

test('divides 6 / 2 to equal 3', () => {
  expect(divide(6, 2)).toBe(3)
})

test('divides by zero to return "Undefined"', () => {
  expect(divide(6, 0)).toBe('Undefined')
})

test('modulus 5 % 2 to equal 1', () => {
  expect(mod(5, 2)).toBe(1)
})

test('exponent 2 ** 3 to equal 8', () => {
  expect(exponent(2, 3)).toBe(8)
})

test('exponent 3 ** 0 to equal 1', () => {
  expect(exponent(3, 0)).toBe(1)
})

test('root 4 of 2 to equal 2', () => {
  expect(root(4, 2)).toBe(2)
})

test('root 27 of 3 to equal 3', () => {
  expect(root(27, 3)).toBe(3)
})

test('root -8 of 3 to equal -2', () => {
  expect(root(-8, 3)).toBe(-2)
})

test('root -8 of 2 to return "Undefined"', () => {
  expect(root(-8, 2)).toBe('Undefined')
})

test('root 4 of 0 to return "Undefined"', () => {
  expect(root(4, 0)).toBe('Undefined')
})