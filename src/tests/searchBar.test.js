import React from "react";
import Header from "../component/Header";
import Foods from "../pages/Foods";
import App from "../App";
import { getByAltText, screen } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import SearchBar from "../component/SearchBar";

describe( 'Teste do Header', () => {
    test('Verifica se contém os radios de pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const radioingredient = screen.getByTestId('ingredient-search-radio');
        expect(radioingredient).toBeInTheDocument();
        const radioName = screen.getByTestId('name-search-radio');
        expect(radioName).toBeInTheDocument();
        const firstLetter = screen.getByTestId('first-letter-search-radio');
        expect(firstLetter).toBeInTheDocument();
    })
    test('verifica o imput de pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const inputSearch = screen.getByTestId("search-input");
        expect(inputSearch).toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('name-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 'bean')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        const recipe = screen.getByTestId('1-recipe-card')
        expect(recipe).toBeInTheDocument();
    })

});