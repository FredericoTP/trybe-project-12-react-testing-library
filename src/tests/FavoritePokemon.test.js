import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testando página FavoritePokemon', () => {
  it('verifica se é exibido um título h2 co o texto "Favorite Pokémon"', () => {
    renderWithRouter(<FavoritePokemon />);

    const favoriteTitle = screen.getByRole('heading', { name: /favorite pokémon/i, level: 2 });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('verifica se exibe uma mensagem caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const message = screen.getByText(/no favorite pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  it('verifica se são exibidos todos os cards de Pokémon favoritados', () => {
    const pokemonFav = [{
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    }, {
      id: 151,
      name: 'Mew',
      type: 'Psychic',
      averageWeight: {
        value: '4.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    }];

    renderWithRouter(<FavoritePokemon pokemonList={ pokemonFav } />);

    const firstPokeName = screen.getByText(/charmander/i);
    const firstPokeType = screen.getByText(/fire/i);
    const firstPokeWeight = screen.getByText(/average weight: 8\.5 kg/i);
    const firstPokeImg = screen.getByRole('img', { name: /charmander sprite/i });
    expect(firstPokeName).toBeInTheDocument();
    expect(firstPokeType).toBeInTheDocument();
    expect(firstPokeWeight).toBeInTheDocument();
    expect(firstPokeImg).toBeInTheDocument();
    expect(firstPokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    const secondPokeName = screen.getByText(/mew/i);
    const secondPokeType = screen.getByText(/psychic/i);
    const secondPokeWeight = screen.getByText(/average weight: 4\.0 kg/i);
    const secondPokeImg = screen.getByRole('img', { name: /mew sprite/i });
    expect(secondPokeName).toBeInTheDocument();
    expect(secondPokeType).toBeInTheDocument();
    expect(secondPokeWeight).toBeInTheDocument();
    expect(secondPokeImg).toBeInTheDocument();
    expect(secondPokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');

    const detailsLink = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsLink).toHaveLength(2);
  });
});
