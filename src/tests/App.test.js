import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('4- Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
    it('Verifica se a page Login ao ser renderizada possui um input de nome e um input de e-mail', () => {
        renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailnput = screen.getByTestId('input-gravatar-email');

        expect(nameInput).toBeInTheDocument();
        expect(emailnput).toBeInTheDocument();
    });

    it(`Verifica se a page Login possui um elemento button com o texto 'Play'
    e ao preencher os inputs corretamente o botão Play é habilitado para clicks`, () => {
        renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailnput = screen.getByTestId('input-gravatar-email'); 
        expect(nameInput.value).toBe('');
        expect(emailnput.value).toBe('');
        

        const btnPlay = screen.getByRole('button', { name:/play/i })
        expect(btnPlay).toBeInTheDocument();
        expect(btnPlay).toBeDisabled();

        userEvent.type(screen.getByTestId('input-player-name'), 'xablau');
        expect(nameInput.value).toBe('xablau');
        userEvent.type(screen.getByTestId('input-gravatar-email'), 'user@email.com');
        expect(emailnput.value).toBe('user@email.com');
        expect(btnPlay).toBeEnabled();
       

    });

});
