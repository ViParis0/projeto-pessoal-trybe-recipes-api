import React from "react";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Página de detalhes da receita', () => {
    test('Verifica se tem as imagens, as cards e os nomes na página de comidas', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        await waitFor( () => {
            screen.getByTestId('11-recipe-card')
        })
        const cards = screen.getByTestId("11-recipe-card")
        expect(cards).toBeInTheDocument();
        const img = screen.getByTestId("11-card-img")
        expect(img).toBeInTheDocument();
        const name = screen.getByTestId("11-card-name")
        expect(name).toBeInTheDocument();
    })
    test('Verifica se tem as imagens, as cards e os nomes na página de bebidas', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/drinks");
        await waitFor( () => {
            screen.getByTestId('11-recipe-card')
        })
        const cards = screen.getByTestId("11-recipe-card")
        expect(cards).toBeInTheDocument();
        const img = screen.getByTestId("11-card-img")
        expect(img).toBeInTheDocument();
        const name = screen.getByTestId("11-card-name")
        expect(name).toBeInTheDocument();
    })

    test('Verifica se ao clicar na receita vai para pagina de detalhes nas comidas', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods");
        const search = screen.getByTestId("All-category-filter")
        userEvent.click(search);
        await waitFor( () => {
            screen.getByTestId('0-recipe-card')
        }, 1000)
        const recipe = screen.getByTestId('0-recipe-card')
        userEvent.click(recipe)
        expect(history.location.pathname).toEqual('/foods/52977');
    })
        test('Verifica se ao clicar na receita vai para pagina de detalhes nas bebidas', async() => {
            const { history } = renderWithRouter(<App />);
            history.push("/drinks");
            const search = screen.getByTestId("All-category-filter")
            userEvent.click(search);
            await waitFor( () => {
                screen.getByTestId('0-recipe-card')
            })
            const recipe = screen.getByTestId('0-recipe-card')
            userEvent.click(recipe)
            expect(history.location.pathname).toEqual('/drinks/15997');
        })
});
