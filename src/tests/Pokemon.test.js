import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const link = () => screen.getByRole('link', { name: 'More details' });

describe('Testing Pokemon component', () => {
  it('Testing if info card is render', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const { name, type, averageWeight: { measurementUnit, value }, image } = pokemons[0];
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
      .toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
  });
  it('Testing if the card have the right link', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const { id } = pokemons[0];
    const details = link();
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('Testing if link redirect to Pokemon details', () => {
    renderWithRouter(<App />);
    const { name } = pokemons[0];
    const details = link();
    userEvent.click(details);
    const title = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Testing if it is the right URL', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const details = link();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Testing if there is a icon on favorite pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const { name } = pokemons[0];
    const imgs = screen.getAllByRole('img');
    const fav = imgs[1];
    expect(fav).toBeInTheDocument();
    expect(fav).toHaveAttribute('src', '/star-icon.svg');
    expect(fav).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
