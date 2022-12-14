import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

export default function Recipes({ limitedRecipes, type }) {
  return (
    type === 'drinks' ? (
      limitedRecipes.map((drink, index) => (
        <Card
          key={ drink.idDrink }
          id={ drink.idDrink }
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
          id={ meal.idMeal }
          index={ index }
          strMealThumb={ meal.strMealThumb }
          strMeal={ meal.strMeal }
        />
      ))
    )
  );
}

Recipes.propTypes = {
  limitedRecipes: PropTypes.shape({
    map: PropTypes.func,
  }),
  type: PropTypes.string,
}.isRequired;
