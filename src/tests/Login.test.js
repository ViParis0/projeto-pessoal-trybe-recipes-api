import React from "react";
import App from "../App";
// import Login from "../pages/Login";
import { screen } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
    test('Verificando os Inputs',() => {
        renderWithRouter(<App />);
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
});
    test('Verifica se o botão está desabilitado com um input vazio',() => {
        renderWithRouter(<App />);
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const btnsubmit = screen.getByTestId('login-submit-btn');
        userEvent.type(inputEmail, 'marcus@gmail.com');
        userEvent.type(inputPassword,'');
        expect(btnsubmit).toBeDisabled();        
    });
    test('Verifica se o botão está habilitado com os inputs corretos', () => {
        renderWithRouter(<App />);
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const btnsubmit = screen.getByTestId('login-submit-btn');
        userEvent.type(inputEmail, 'marcus@gmail.com');
        userEvent.type(inputPassword, '1234567');
        expect(btnsubmit).not.toBeDisabled();
    });
    test('Verifica se ao clicar no botão é redirecionado a página da tela principal',() => {
        const { history } = renderWithRouter(<App />);
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const btnsubmit = screen.getByTestId('login-submit-btn');
        userEvent.type(inputEmail, 'marcus@gmail.com');
        userEvent.type(inputPassword, '1234567');
        userEvent.click(btnsubmit);
        expect(history.location.pathname).toEqual('/foods');
    });
})