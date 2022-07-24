import React from "react";
import App from "../App";
import { screen } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import soupMeals from "../../cypress/mocks/soupMeals";

describe( 'Teste do Header', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(soupMeals)
        })
    }) 
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
    test('verifica o input de pesquisa', () => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const inputSearch = screen.getByTestId("search-input");
        expect(inputSearch).toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com nome', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('name-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 'soup')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        const recipe = await screen.findByTestId('3-recipe-card')
        const notIn = screen.queryByTestId('13-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com ingrediente', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('ingredient-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 'salt')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        const recipe = await screen.findByTestId('1-recipe-card')
        const notIn = screen.queryByTestId('12-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
    test('verifica o filtro da pesquisa com a primeira letra', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const iconSearch = screen.getByRole('img', {  name: /ícone de pesquisa/i})
        expect(iconSearch).toBeInTheDocument();
        userEvent.click(iconSearch);
        const namecard = screen.getByTestId('first-letter-search-radio');
        userEvent.click(namecard);
        const inputSearch = screen.getByTestId("search-input");
        userEvent.type(inputSearch, 's')
        const btn = screen.getByTestId('exec-search-btn');
        userEvent.click(btn);
        const recipe = await screen.findByTestId('1-recipe-card')
        const notIn = screen.queryByTestId('12-recipe-card')
        expect(recipe).toBeInTheDocument();
        expect(notIn).not.toBeInTheDocument();
    })
});
