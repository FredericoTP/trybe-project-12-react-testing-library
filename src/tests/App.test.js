import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando App.js', () => {
  it('verifica o título da página', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /pokédex/i, level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('verifica se contém um conjunto fixo de links na navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('verifica se a aplicação é redirecionada para a página inicial ao clicar no link "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('verifica se a aplicação é redirecionada para a página About ao clicar no link "About"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('verifica se a aplicação é redirecionada para a página Favorite ao clicar no link "Favorite Pokemon"', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/digimon');
    });

    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
