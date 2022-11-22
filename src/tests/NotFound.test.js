import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando página NotFound', () => {
  it('verifica se é exibido um título h2 co o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('verifica se é exibida uma imagem com url expecífica', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
