import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CurrentRecipe from '../component/CurrentRecipe';

export default function RecipeInProgress({ location: { pathname } }) {
  const [apiReturn, setApiReturn] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measureUnits, setMeasureUnits] = useState([]);
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  useEffect(() => {
    const newIngredients = Object.entries(apiReturn)
      .filter(([key, value]) => key.includes('ngredient') && value)
      .map(([key, value]) => ({
        name: value,
        done: false,
        key,
      }));
    setIngredients(newIngredients);
    const FILTER_MEASURE = Object.entries(apiReturn)
      .filter(([keyM, valueM]) => keyM
        .includes('strMeasure')
        && valueM)
      .map(([key, value]) => ({
        name: value,
        key,
      }));
    setMeasureUnits(FILTER_MEASURE);
  }, [apiReturn]);

  useEffect(() => {
    if (type === 'foods') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setApiReturn(data.meals[0]));
    }

    if (type === 'drinks') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setApiReturn(data.drinks[0]);
        });
    }
  }, []);

  return (
    ingredients.length > 0
    && (
      <div className="conteiner">
        {type === 'foods' ? (
          <CurrentRecipe
            strThumb={ apiReturn.strMealThumb }
            strTitle={ apiReturn.strMeal }
            strCategory={ apiReturn.strCategory }
            ingredients={ ingredients }
            measureUnits={ measureUnits }
            strInstructions={ apiReturn.strInstructions }
            strTags={ apiReturn.strTags || [] }
            strArea={ apiReturn.strArea }
            strAlcoholic={ apiReturn.strAlcoholic || '' }
            recipeType="food"
            id={ id }
          />
        ) : (
          <CurrentRecipe
            strThumb={ apiReturn.strDrinkThumb }
            strTitle={ apiReturn.strDrink }
            strCategory={ apiReturn.strCategory }
            ingredients={ ingredients }
            measureUnits={ measureUnits }
            strInstructions={ apiReturn.strInstructions }
            strTags={ apiReturn.strTags || [] }
            strArea={ apiReturn.strArea || '' }
            strAlcoholic={ apiReturn.strAlcoholic }
            recipeType="drink"
            id={ id }
          />
        )}
      </div>
    )
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

RecipeInProgress.defaultProps = {
  location: {
    pathname: '',
  },
};
