import React from "react";
import App from "../App";
import { screen, waitFor,within } from "@testing-library/react";
import renderWithRouter from './renderWithRouter';

describe('Página de detalhes da receita', () => {
    test('Verifica se tem todas as informções da receita', async() => {
        const { history } = renderWithRouter(<App />);
        history.push("/foods/53060");
        await waitFor( () => {
            screen.getByTestId('recipe-title')
        }, 200)
        const img = screen.getByTestId('recipe-photo')
        expect(img).toBeInTheDocument();
        const recipe = screen.getByTestId('recipe-title')
        expect(recipe).toBeInTheDocument();
        const category = screen.getByTestId('recipe-category')
        expect(category).toBeInTheDocument();
        const ingredient = screen.getByTestId('17-ingredient-name-and-measure')
        expect(ingredient).toBeInTheDocument();
        const instructions = screen.getByTestId('instructions')
        expect(instructions).toBeInTheDocument();  
        const video = screen.getByTestId('video')
        expect(video).toBeInTheDocument(); 
        const recomendtion = screen.getByTestId('0-recomendation-card')
        expect(recomendtion).toBeInTheDocument();
        const startBtn = screen.getByTestId('start-recipe-btn')
        expect(startBtn).toBeInTheDocument();
    })
});