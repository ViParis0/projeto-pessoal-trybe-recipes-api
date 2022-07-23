import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const INITIAL_STATE = {
  cocktails: {
  },
  meals: {
  },
};

export default function CurrentRecipe({ strThumb,
  strTitle, strCategory, ingredients, strInstructions,
  recipeType, measureUnits, id, strTags, strArea, strAlcoholic,
}) {
  const [state, setState] = useState([]);
  const [localState, setLocalState] = useState(INITIAL_STATE);
  const [measure, setMeasureUnits] = useState([]);
  const [isDisabled, setIsDisables] = useState(true);
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

  useEffect(() => {
    setIsDisables(!state.every((value) => value.done));
  }, [state]);

  //   [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  const handleClick = () => {
    const result = localStorage.getItem('doneRecipes');
    const newObj = {
      id,
      type: recipeType === 'foods' ? 'food' : 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strTitle,
      image: strThumb,
      doneDate: new Date(),
      tags: strTags.length ? strTags.split(',').slice(0, 2) : [],
    };
    if (result) {
      const newArr = JSON.parse(result);
      const doneRecipe = newArr.filter((recipe) => recipe.id !== newObj.id);
      const finalArr = [...doneRecipe, newObj];
      localStorage.setItem('doneRecipes', JSON.stringify(finalArr));
    } else {
      const newArr = [newObj];
      localStorage.setItem('doneRecipes', JSON.stringify(newArr));
    }
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
            alt={ strTitle }
            width="125px"
          />
          <span data-testid="recipe-title">{strTitle}</span>
          <span data-testid="recipe-category">{strCategory}</span>
          <ShareButton testId="share-btn" />
          <FavoriteButton />
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
  strCategory: PropTypes.string,
  strThumb: PropTypes.string,
  strTitle: PropTypes.string,
}.isRequired;
