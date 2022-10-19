import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing App component', () => {
  it('Testing if there is a set of links', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveTextContent('Home');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toBeInTheDocument();
    expect(links[1]).toHaveTextContent('About');
    expect(links[1]).toHaveAttribute('href', '/about');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
    expect(links[2]).toHaveAttribute('href', '/favorites');
  });
  it('Testing clicking on home link redirects to /', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testing clicking on about link redirects to /about ', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testing clicking on favorite pokémons link redirects to /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testing if enter a nonexistent path redirects to Not Found component', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/aaaa');
    });
    const notFoundTitle = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    expect(notFoundTitle).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/aaaa');
  });
});
