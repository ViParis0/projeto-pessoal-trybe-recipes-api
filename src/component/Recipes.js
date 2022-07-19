import React from 'react';
import Card from './Card';

export default function Recipes({ limitedRecipes, type }) {
  return (
    type === 'drinks' ? (
      limitedRecipes.map((drink, index) => (
        <Card
          key={ drink.idDrink }
          index={ index }
          strDrinkThumb={ drink.strDrinkThumb }
          strDrink={ drink.strDrink }
          type="drink"
        />
      ))
    ) : (
      limitedRecipes.map((meal, index) => (
        <Card
          key={ meal.idMeal }
          index={ index }
          strMealThumb={ meal.strMealThumb }
          strMeal={ meal.strMeal }
        />
      ))
    )
  );
}
