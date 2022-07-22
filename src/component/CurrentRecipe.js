import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const copy = require('clipboard-copy');

const INITIAL_STATE = {
  cocktails: {
  },
  meals: {
  },
};

export default function CurrentRecipe({ strThumb,
  strTile, strCategory, ingredients, strInstructions, recipeType, measureUnits, id,
}) {
  const [state, setState] = useState([]);
  const [localState, setLocalState] = useState(INITIAL_STATE);
  const [measure, setMeasureUnits] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const [isDisabled, setIsDisables] = useState(true);
  const history = useRouteMatch();
  const history2 = useHistory();

  const handleChange = (ingredient) => {
    const newState = [...state];
    const indexOfIngredient = state.indexOf(ingredient);
    const newIngredient = state.find((value) => value.name === ingredient.name);
    const newObj = {
      ...newIngredient,
      done: !newIngredient.done,
    };
    newState.splice(indexOfIngredient, 1, newObj);
    setState(newState);
  };

  useEffect(() => {
    if (recipeType === 'foods') {
      const newStorage = {
        ...localState,
        meals: {
          [id]: state,
        },

      };
      setLocalState(newStorage);
    }
    if (recipeType === 'drink') {
      const newStorage = {
        ...localState,
        cocktails: {
          [id]: state,
        },

      };
      setLocalState(newStorage);
    }
  }, [state]);

  useEffect(() => {
    const result = localStorage.getItem('inProgressRecipes');
    if (!result) {
      const newObj = { ...localState };
      const newProgressRecipe = JSON.stringify(newObj);
      localStorage.setItem('inProgressRecipes', newProgressRecipe);
    } else {
      const data = JSON.parse(result);
      const newObj = {
        ...data,
        meals: {
          ...data.meals,
          ...localState.meals,
        },
        cocktails: {
          ...data.cocktails,
          ...localState.cocktails,
        },
      };
      const newProgressRecipe = JSON.stringify(newObj);
      localStorage.setItem('inProgressRecipes', newProgressRecipe);
    }
  }, [localState]);

  const handleShare = () => {
    const TWO_SECONDS = 2000;
    copy(`http://localhost:3000${history.url}`);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), TWO_SECONDS);
  };

  useEffect(() => {
    setIsDisables(!state.every((value) => value.done));
  }, [state]);

  const handleClick = () => {
    history2.push('/done-recipes');
  };

  useEffect(() => {
    const checkeds = localStorage.getItem('inProgressRecipes');
    const result = JSON.parse(checkeds);
    if (recipeType === 'foods' && result.meals[id]) {
      setState(result.meals[id]);
    } else if (recipeType === 'drink' && result.cocktails[id]) {
      setState(result.cocktails[id]);
    } else {
      setState(ingredients);
      setMeasureUnits(measureUnits);
    }
  }, []);

  return (
    state.length
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ strThumb }
            alt={ strTile }
            width="125px"
          />
          <span data-testid="recipe-title">{strTile}</span>
          <span data-testid="recipe-category">{strCategory}</span>
          {copySuccess}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleShare }
          >
            share
          </button>
          <button type="button" data-testid="favorite-btn">fav</button>
          <span>Igredients</span>
          {state.length && state.map((ingredient, index) => (
            <label
              key={ ingredient.name }
              className={ ingredient.done ? 'line' : '' }
              htmlFor={ ingredient.name }
              data-testid={ `${index}-ingredient-step` }
            >
              {ingredient.name}
              <input
                type="checkbox"
                checked={ ingredient.done }
                id={ ingredient.name }
                onChange={ () => handleChange(ingredient) }
              />
            </label>
          ))}
          {measure.map((unit, index) => (
            <p
              key={ unit.key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {unit.name}
            </p>
          ))}
          Instructions
          <p data-testid="instructions">{strInstructions}</p>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="finish-recipe-btn"
            onClick={ handleClick }
          >
            Finish recipe
          </button>
        </div>
      )
  );
}

CurrentRecipe.propTypes = {
  ingredients: PropTypes.shape({
    map: PropTypes.func,
  }),
  strCategory: PropTypes.any,
  strThumb: PropTypes.any,
  strTile: PropTypes.any,
}.isRequired;
