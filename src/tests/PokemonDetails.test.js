import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const link = () => screen.getByRole('link', { name: 'More details' });

describe('Testing PokemonDetails component', () => {
  it('Testing if shows pokemon information', () => {
    renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    const details = link();
    userEvent.click(details);
    const title = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });
  it('Testing if there is a map section', () => {
    renderWithRouter(<App />);
    const { name, foundAt } = pokemons[0];
    const details = link();
    userEvent.click(details);
    const locationTitle = screen.getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    expect(locationTitle).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      const imgs = screen.getAllByAltText(`${name} location`);
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(imgs[index]).toHaveAttribute('src', map);
      expect(imgs[index]).toHaveAttribute('alt', `${name} location`);
    });
  });
  it('Testing if is possible to favorite pokémon from PokemonDetails component', () => {
    renderWithRouter(<App />);
    const { name } = pokemons[0];
    const details = link();
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const fav = screen.queryByAltText(`${name} is marked as favorite`);
    expect(fav).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    const fav1 = screen.queryByAltText(`${name} is marked as favorite`);
    expect(fav1).not.toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const fav2 = screen.queryByAltText(`${name} is marked as favorite`);
    expect(fav2).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    const fav3 = screen.queryByAltText(`${name} is marked as favorite`);
    expect(fav3).not.toBeInTheDocument();
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
