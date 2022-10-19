import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testing Not Fount component', () => {
  it('Testing if contains a heading "Page request not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Testing if contains a image', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
