import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

const copy = require('clipboard-copy');

export default function CurrentRecipe({ strThumb,
  strTile, strCategory, ingredients, strInstructions, recipeType, measureUnits,
}) {
  const [state, setState] = useState([]);
  const [measure, setMeasureUnits] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const history = useRouteMatch();

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
    const progressRecipe = state.filter((value) => value.done);
    const newProgressRecipe = JSON.stringify(progressRecipe);
    localStorage.setItem(recipeType, newProgressRecipe);
  }, [state]);

  useEffect(() => setState(ingredients), []);
  useEffect(() => setMeasureUnits(measureUnits), []);

  // function handleCopy() {
  //   // https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
  //   const el = document.createElement('input');
  //   el.value = window.location.href;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  // }

  const handleShare = () => {
    const TWO_SECONDS = 2000;
    copy(`http://localhost:3000${history.url}`);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), TWO_SECONDS);
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ strThumb } alt={ strTile } width="125px" />
      <span data-testid="recipe-title">{strTile}</span>
      <span data-testid="recipe-category">{strCategory}</span>
      {copySuccess}
      <button type="button" data-testid="share-btn" onClick={ handleShare }>share</button>
      <button type="button" data-testid="favorite-btn">fav</button>
      <span>Igredients</span>
      {state.map((ingredient, index) => (
        <label
          key={ ingredient.name }
          className={ ingredient.done ? 'line' : '' }
          htmlFor={ ingredient.name }
        >
          {ingredient.name}
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
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
      <button type="button" data-testid="finish-recipe-btn">Finish recipe</button>
    </div>
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
