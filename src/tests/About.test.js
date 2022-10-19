import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testing About component', () => {
  it('Testing if the page contains information about Pokédex.', () => {
    renderWithRouter(<About />);
    const parag = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons',
    );
    expect(parag).toBeInTheDocument();
    const parag2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(parag2).toBeInTheDocument();
  });
  it('Testing if the page contains a heading "About Pokédex".', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Testing if the page contains 2 paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    const parags = container.querySelectorAll('p');
    expect(parags).toHaveLength(2);
    expect(parags[0]).toHaveTextContent('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(parags[1]).toHaveTextContent('One can filter Pokémons by type, and see more details for each one of them');
  });
  it('Testing if the page contains a Pokédex image', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
