import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { isOperator, isDigit, hasOpenParen } from '../util/conditionCheck'
import App from '../src/App'

/* ----- Unit Tests ----- */
test('isDigit with digit', () => {
  expect(isDigit('0')).toBe(true)
})

test('isDigit with non digit', () => {
  expect(isDigit('a')).toBe(false)
})

test('isOperator with operator', () => {
  expect(isOperator('+')).toBe(true)
})

test('isOperator with non operator', () => {
  expect(isOperator('k')).toBe(false)
})

test('hasOpenParen with open paren', () => {
  expect(hasOpenParen('(1+2(-3)')).toBe(true)
})

test('hasOpenParen with non open paren', () => {
  expect(hasOpenParen('(1+2(-3))')).toBe(false)
})

/* ----- Integration Tests ----- */
test('Add and compute', () => {
  render(<App />)
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  expect(screen.getByTestId('current-text')).toHaveTextContent('2+3');
  fireEvent.click(screen.getByText('='))
  expect(screen.getByTestId('current-text')).toHaveTextContent('5');
})

test('Clear and null error', () => {
  render(<App />)
  fireEvent.click(screen.getByText('0'))
  expect(screen.getByTestId('current-text')).toHaveTextContent('0');
  fireEvent.click(screen.getByText('C'))
  expect(screen.getByTestId('current-text')).toHaveTextContent('');
  fireEvent.click(screen.getByText('='));
  expect(screen.getByTestId('error-message')).toHaveTextContent('Input cannot be null')
})

test('Delete and Open Parenthesis with keyboard', () => {
  render(<App />)
  fireEvent.keyDown(window, { key: '('})
  fireEvent.keyDown(window, { key: '-'})
  fireEvent.keyDown(window, { key: '3'})
  fireEvent.keyDown(window, { key: ')'})
  fireEvent.keyDown(window, { key: 'Backspace'})
  expect(screen.getByTestId('current-text')).toHaveTextContent('(-3');
  fireEvent.keyDown(window, { key: 'Enter'})
  expect(screen.getByTestId('error-message')).toHaveTextContent('Input cannot have open parenthesis')
})