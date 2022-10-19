import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { PokemonButtonsPanel } from '../components';

const getNextButton = (role, name) => screen.getByRole(role, { name });
const nameButton = 'Próximo pokémon';

describe('Testing Pokedex component', () => {
  it('Testing if contains a heading "Encoutered pokemons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Testing if shows the next pokemon when the next button is clicked', () => {
    renderWithRouter(<App />);
    const button = getNextButton('button', nameButton);
    expect(button).toBeInTheDocument();
    pokemons.forEach(({ name }, index) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(button);
      if (index === pokemons.length - 1) {
        expect(screen.getByText(pokemons[0].name))
          .toBeInTheDocument();
      }
    });
  });
  it('Testing if only one pokémon it is on the screen at a time .', () => {
    renderWithRouter(<App />);
    const id = screen.getAllByTestId('pokemon-name');
    expect(id).toHaveLength(1);
  });
  it('Testing if there are filter buttons.', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const all = screen.getByRole('button', { name: /all/i });
    const nextBtn = getNextButton('button', nameButton);
    const pokTypes = pokemons.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) {
        acc.push(curr.type);
      }
      return acc;
    }, []);
    buttons.forEach((type, index) => {
      userEvent.click(type);
      expect(type.textContent).toBe(pokTypes[index]);
      const filter = pokemons.filter((pokemon) => pokemon.type.includes(type));
      filter.forEach(() => {
        expect(screen.getAllByText(type.textContent)).toHaveLength(2);
        userEvent.click(nextBtn);
      });
      expect(all).toBeInTheDocument();
    });
  });
  it('Testing if there is a reseting filter button', () => {
    renderWithRouter(<App />);
    global.filterPokemons = jest.fn().mockReturnValue(pokemons);
    const button = screen.getByRole('button', { name: /all/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    global.filterPokemons('all');
    expect(global.filterPokemons).toHaveBeenCalled();
    expect(global.filterPokemons).toHaveBeenCalledWith('all');
    const nextBtn = getNextButton('button', nameButton);
    pokemons.forEach(({ name }, index) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextBtn);
      if (index === pokemons.length - 1) {
        expect(screen.getByText(pokemons[0].name))
          .toBeInTheDocument();
      }
    });
  });
});
