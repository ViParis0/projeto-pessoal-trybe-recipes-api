import React from "react";
import Header from "../component/Header";
import Foods from "../pages/Foods";
import App from "../App";
import { getByAltText, screen } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import SearchBar from "../component/SearchBar";

describe( 'Teste do Header', () => {
    test('Verifica se contém uma barra de pesquisa no Header', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const btnsearch = screen.getByRole('button', {  name: /search/i})
        expect(btnsearch).toBeInTheDocument();
    })
    test('Verifica se ao clicar no botão de perfil é redirecionado a página correta',() => {
        const { history } = renderWithRouter(<Header />);
        const profile = screen.getByTestId('profile-top-btn');
        userEvent.click(profile);
        expect(history.location.pathname).toEqual('/profile');
    });
});