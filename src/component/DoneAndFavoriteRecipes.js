import React, { useContext } from 'react';
import ShareButton from './ShareButton';
import detailContext from '../context/detailContex';

// [{
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

export default function DoneAndFavoriteRecipes() {
  const { doneRecipes } = useContext(detailContext);
  return (
    <div>
      {doneRecipes.length && doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </span>
          <p>{recipe.alcoholicOrNot}</p>
          <span data-testid={ `${index}-horizontal-name` }>{recipe.name}</span>
          <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
          <ShareButton
            testId={ `${index}-horizontal-share-btn` }
            recipeId={ recipe.id }
            type={ recipe.type }
          />
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width="150px"
            data-testid={ `${index}-horizontal-image` }
          />
          {recipe.tags.length && recipe.tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
