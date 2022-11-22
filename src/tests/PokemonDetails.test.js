import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('testando componente PokemonDetails', () => {
  it('verifica se as informações detalhadas do pokemon são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);

    const detailTitle = screen.getByRole('heading', { name: `${pokemonList[0].name} Details` });
    expect(detailTitle).toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();
    const pokemonInfo = screen.getByText(pokemonList[0].summary);
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('verifica se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const pokemon = pokemonList[0];
    const { foundAt } = pokemon;

    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);

    const location = screen.getByRole('heading', { name: `Game Locations of ${pokemon.name}` });
    expect(location).toBeInTheDocument();

    const image = screen.getAllByRole('img', { name: `${pokemon.name} location` });
    expect(image).toHaveLength(foundAt.length);

    foundAt.forEach((item, index) => {
      const paragraph = screen.getByText(item.location);
      expect(paragraph).toBeInTheDocument();
      expect(image[index]).toHaveAttribute('src', item.map);
    });
  });

  it('verifica se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);

    const labelText = screen.queryByText(/pokémon favoritado\?/i);
    expect(labelText).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(image).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(image).not.toBeInTheDocument();
  });
});
