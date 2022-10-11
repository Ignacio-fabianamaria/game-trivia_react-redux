import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('4- Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
    it('Verifica se a page Login ao ser renderizada possui um input de nome e um input de e-mail', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailnput = screen.getByTestId('input-gravatar-email');

        expect(nameInput).toBeInTheDocument();
        expect(emailnput).toBeInTheDocument();
        expect(nameInput.value).toBe('');
        expect(emailnput.value).toBe('');


        const btnPlay = screen.getByRole('button', { name: /play/i })
        expect(btnPlay).toBeInTheDocument();
        expect(btnPlay).toBeDisabled();

        userEvent.type(screen.getByTestId('input-player-name'), 'xablau');
        expect(nameInput.value).toBe('xablau');
        userEvent.type(screen.getByTestId('input-gravatar-email'), 'user@email.com');
        expect(emailnput.value).toBe('user@email.com');
        expect(btnPlay).toBeEnabled();

        userEvent.click(btnPlay);
        const { pathname } = history.location;
        expect(pathname).toBe('/game');
    });

    it(`Verifica se a page Login possui um elemento button com o texto 'Settings'
    e ao ser acionado redireciona para rota /settings`, () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnSettings = screen.getByRole('button', { name: /settings/i });
        expect(btnSettings).toBeInTheDocument();

        userEvent.click(btnSettings);
        const { pathname } = history.location;
        expect(pathname).toBe('/settings');

    });
    it(`Verifica se ocorre uma chamada à API para obter o token de jogador`, async () => {
        const tokenApi = {//simulando o retorno da requisição
            response_code: 0,
            response_message: 'Token Generated Successfully!',
            token: '4f501b9a94e54dc88c8d6ff7c1443a1c8cb7b9d4820517b4ea3e2605404e8796',
        };
        
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(tokenApi),

        });

        renderWithRouterAndRedux(<App />);

        expect(global.fetch).toHaveBeenCalled();

    });

});

/*__________________________________________________________________________________________________
-Quando a função fetch for chamada, em vez de fazer uma requisição a uma API externa,
        será utilizado no teste a simulação para tornar o teste mais confiável.
          -O método mockResolvedValue permite que ao chamar a  requisição falsa, 
        o valor retornado seja o que foi passado como parametro(tokenApi), imitando o que a API 
        retornaria caso a requisição fosse real.
_____________________________________________________________________________________________________*/