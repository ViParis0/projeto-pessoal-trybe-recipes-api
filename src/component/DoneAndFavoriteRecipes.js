import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import detailContext from '../context/detailContex';

export default function DoneAndFavoriteRecipes() {
  const { doneRecipes } = useContext(detailContext);
  return (
    <div>
      {doneRecipes.length > 0 && doneRecipes.map((recipe, index) => (
        <div
          key={ recipe.id }
          className="flex justify-between
        bg-white p-1 rounded shadow m-2"
        >
          <div className="w-1/2">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="w-52"
                src={ recipe.image }
                alt={ recipe.name }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div className="ml-1 flex flex-col">
            <span
              className="text-gray-400"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.alcoholicOrNot}${recipe.nationality} - ${recipe.category}`}
            </span>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <span
                data-testid={ `${index}-horizontal-name` }
                className="text-3xl"
              >
                {recipe.name}
              </span>
            </Link>
            <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
            <ShareButton
              testId={ `${index}-horizontal-share-btn` }
              recipeId={ recipe.id }
              type={ recipe.type }
            />
            {recipe.tags.length > 0 && recipe.tags.map((tag) => (
              <p
                className="bg-indigo-200 w-20 text-center rounded-lg"
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
