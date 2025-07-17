import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App'

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