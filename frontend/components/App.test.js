import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import AppFunctional from './AppFunctional';

// Write your tests here

describe('AppFunctional Component', () => {
  test('renders intital coordinates text', () => {
    render(<AppFunctional />)
    const coordinatesElement = screen.getByText(/Coordinates \(2, 2\)/i);
    expect(coordinatesElement).toBeInTheDocument();
  });

  test('renders initial steps text', () => {
    render(<AppFunctional />);
    const stepsElement = screen.getByText(/You moved 0 times/i);
    expect(stepsElement).toBeInTheDocument();
  });

  test('render all direction buttons', () => {
    render(<AppFunctional />);
    const leftButton = screen.getByText(/LEFT/i);
    const upButton = screen.getByText(/UP/i);
    const rightButton = screen.getByText(/RIGHT/i);
    const downButton = screen.getByText(/DOWN/i);
    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
  });

  test('renders reset button', () => {
    render(<AppFunctional />);
    const resetButton = screen.getByText(/reset/i);
    expect(resetButton).toBeInTheDocument();
  });

  test('email input changes value when typed', () => {
    render(<AppFunctional />)
    const emailInput = screen.getByPlaceholderText(/type email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  })
})

