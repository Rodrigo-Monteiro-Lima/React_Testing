import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testing FavoritePokemons component', () => {
  it('Testing if shows a message when there isn\'t any favorite pokémon', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('Testing if shows all favorites pokémon.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const imgs = screen.getAllByRole('img');
    expect(imgs[1]).toHaveAttribute('src', '/star-icon.svg');
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const imgsHome = screen.getAllByRole('img');
    expect(imgsHome[1]).toHaveAttribute('src', '/star-icon.svg');
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(button);
    const details2 = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details2);
    const checkbox2 = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(checkbox2);
    const fav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(fav);
    const text = screen.queryByText('No favorite pokemon found');
    expect(text).not.toBeInTheDocument();
    const favs = screen.getAllByAltText(/is marked as favorite/i);
    expect(favs).toHaveLength(2);
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
