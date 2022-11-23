import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const NAME_POKE = 'pokemon-name';
const NEXT_POKE = 'next-pokemon';

describe('Testando página Pokedex', () => {
  it('verifica se é exibido um título h2 co o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    const pokemon = pokemonList.map((item) => item.name);

    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(NAME_POKE);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemon[0]);

    const btnNextPokemon = screen.getByTestId(NEXT_POKE);
    expect(btnNextPokemon).toBeInTheDocument();
    expect(btnNextPokemon).toHaveTextContent('Próximo Pokémon');

    pokemon.forEach((item) => {
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(item);
      userEvent.click(btnNextPokemon);
    });

    expect(pokemonName).toHaveTextContent(pokemon[0]);
  });

  it('verifica se é exibido apenas um pokemon por vez', () => {
    const pokemon = pokemonList.map((item) => item.name);

    renderWithRouter(<App />);

    const detailsBtn = screen.getAllByRole('link', { name: /more details/i });
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemon.forEach(() => {
      expect(detailsBtn).toHaveLength(1);
      userEvent.click(btnNextPokemon);
    });
  });

  it('verifica se a Pokedex tem os botões de filtragem por tipo de pokemon', () => {
    const pokemon = pokemonList.map((item) => item.type);
    const types = [...new Set(pokemon)];

    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    types.forEach((type, index) => {
      expect(typeButtons[index]).toHaveTextContent(type);
    });

    expect(typeButtons).toHaveLength(types.length);
  });

  it('Verifica se A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    const pokemon = pokemonList.map((item) => item.type);
    const types = [...new Set(pokemon)];

    renderWithRouter(<App />);

    types.forEach((type) => {
      const list = pokemonList.filter((e) => e.type === type);
      const btnType = screen.getByRole('button', { name: type });
      userEvent.click(btnType);

      list.forEach((item) => {
        const namePoke = screen.getByTestId(NAME_POKE);
        expect(namePoke).toHaveTextContent(item.name);
        const nextPoke = screen.getByTestId(NEXT_POKE);
        userEvent.click(nextPoke);
      });
    });
  });

  it('verifica o botão all', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /all/i });
    const name = screen.getByTestId(NAME_POKE);
    const next = screen.getByTestId(NEXT_POKE);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    userEvent.click(all);
    userEvent.click(next);
    expect(name).toHaveTextContent('Charmander');
  });
});
