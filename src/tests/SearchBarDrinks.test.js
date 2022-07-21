import React from "react";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe( 'Teste do Header', () => {
    test('Verifica se contém os radios de pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
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
    test('verifica o input de pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const inputSearch = screen.getByTestId("search-input");
        expect(inputSearch).toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com nome na página de drinks', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('name-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 'egg')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        await waitFor( () => {
            screen.getByTestId('0-recipe-card')
        })
        const recipe = screen.getByTestId('0-recipe-card')
        const notIn = screen.queryByTestId('5-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com ingrediente na página de drinks', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('ingredient-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 'salt')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        await waitFor( () => {
            screen.getByTestId('0-recipe-card')
        })
        const recipe = screen.getByTestId('0-recipe-card')
        const notIn = screen.queryByTestId('9-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com a primeira letra na página de drinks', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('first-letter-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 's')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        await waitFor( () => {
            screen.getByTestId('0-recipe-card')
        })
        const recipe = screen.getByTestId('0-recipe-card')
        const notIn = screen.queryByTestId('14-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
});