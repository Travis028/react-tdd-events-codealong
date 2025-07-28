import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PizzaForm from './PizzaForm';

describe('PizzaForm', () => {
  test('all checkboxes are initially unchecked', () => {
    render(<PizzaForm />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
  });

  test('toppings list initially contains only "Cheese"', () => {
    render(<PizzaForm />);
    const toppings = screen.getAllByRole('listitem');
    expect(toppings).toHaveLength(1);
    expect(toppings[0]).toHaveTextContent('Cheese');
  });

  test('checkboxes are properly labeled', () => {
    render(<PizzaForm />);
    const pepperoniCheckbox = screen.getByRole('checkbox', { name: /pepperoni/i });
    const mushroomsCheckbox = screen.getByRole('checkbox', { name: /mushrooms/i });
    const olivesCheckbox = screen.getByRole('checkbox', { name: /olives/i });
    expect(pepperoniCheckbox).toBeInTheDocument();
    expect(mushroomsCheckbox).toBeInTheDocument();
    expect(olivesCheckbox).toBeInTheDocument();
  });

  test('toppings appear in correct order when checked', async () => {
    const user = userEvent.setup();
    render(<PizzaForm />);
    
    const pepperoniCheckbox = screen.getByRole('checkbox', { name: /pepperoni/i });
    const mushroomsCheckbox = screen.getByRole('checkbox', { name: /mushrooms/i });
    const olivesCheckbox = screen.getByRole('checkbox', { name: /olives/i });

    await user.click(pepperoniCheckbox);
    await user.click(mushroomsCheckbox);
    await user.click(olivesCheckbox);

    const toppings = screen.getAllByRole('listitem');
    expect(toppings).toHaveLength(4);
    expect(toppings[0]).toHaveTextContent('Cheese');
    expect(toppings[1]).toHaveTextContent('Pepperoni');
    expect(toppings[2]).toHaveTextContent('Mushrooms');
    expect(toppings[3]).toHaveTextContent('Olives');
  });

  test('toppings disappear in correct order when unchecked', async () => {
    const user = userEvent.setup();
    render(<PizzaForm />);
    
    const pepperoniCheckbox = screen.getByRole('checkbox', { name: /pepperoni/i });
    const mushroomsCheckbox = screen.getByRole('checkbox', { name: /mushrooms/i });
    const olivesCheckbox = screen.getByRole('checkbox', { name: /olives/i });

    // Check all boxes first
    await user.click(pepperoniCheckbox);
    await user.click(mushroomsCheckbox);
    await user.click(olivesCheckbox);

    // Then uncheck them in reverse order
    await user.click(olivesCheckbox);
    await user.click(mushroomsCheckbox);
    await user.click(pepperoniCheckbox);

    const toppings = screen.getAllByRole('listitem');
    expect(toppings).toHaveLength(1);
    expect(toppings[0]).toHaveTextContent('Cheese');
  });
});
