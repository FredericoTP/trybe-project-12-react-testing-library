import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemon = {
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
};

describe('Testando componente Pokemon', () => {
  it('verifica se é renderizado o card do pokemon corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Charmander');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 8.5 kg');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  it('verifica se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemon/${pokemon.id}`);
  });

  it('verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const {
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemon.id}`);
  });

  it('verifica se existe um ícone de estrela no pokemon favoritado', () => {
    const truth = true;
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ truth } />);

    const favoriteImage = screen.getByRole('img', { name: /charmander is marked as favorite/i });
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImage).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
