import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testando componente About', () => {
  it('verifica se contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const pokedexTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('verifica se existe informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const aboutPokedexTwo = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(aboutPokedex).toBeInTheDocument();
    expect(aboutPokedexTwo).toBeInTheDocument();
  });

  it('verifica se a imagem é renderizada corretamente', () => {
    renderWithRouter(<About />);

    const imagePokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
