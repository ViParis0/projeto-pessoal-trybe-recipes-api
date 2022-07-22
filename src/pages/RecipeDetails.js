import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ButtonStartRecipe from '../component/ButtonStartRecipe';
import detailContext from '../context/detailContex';
import ShareButton from '../component/ShareButton';
import FavoriteButton from '../component/FavoriteButton';

// Referência 01: Replace: https://stackoverflow.com/questions/20498831/refused-to-display-in-a-frame-because-it-set-x-frame-options-to-sameorigin
export default function RecipeDetails({ location: { pathname } }) {
  const { handleFetch, recommended, detailsItem, filterIngredients, filterMeasure,
  } = useContext(detailContext);
  const { id } = useParams();
  const ID = pathname.split('/')[2];

  useEffect(() => {
    handleFetch(pathname, id);
  }, []);

  return (
    recommended !== undefined
&& (
  pathname === `/drinks/${ID}`
    ? (
      <div className="conteiner">
        <div
          data-testid="recipe-title"
        >
          { detailsItem.strDrink }
        </div>
        <img
          data-testid="recipe-photo"
          src={ detailsItem.strDrinkThumb }
          alt={ detailsItem.strDrink }
          width="100px"
          height="100px"
        />
        <div
          data-testid="recipe-category"
        >
          Category:
          { detailsItem.strAlcoholic }
        </div>
        <div
          data-testid="instructions"
        >
          Instructions:
          { detailsItem.strInstructions }
        </div>
        <div>
          Ingredients and Measures:
          { filterIngredients.map((ingredients, index) => (
            <div
              key={ index }
            >
              <div
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredients.name }
              </div>
            </div>
          ))}
          { filterMeasure.map((measure, ind) => (
            <div
              key={ ind }
            >
              <div
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                { measure.name }
              </div>
            </div>
          ))}
        </div>
        <div>
          Recommended:
          { recommended.map((recom, index) => (
            <div
              key={ index }
            >
              <div
                data-testid={ `${index}-recomendation-card` }
              >
                { recom }
              </div>
            </div>
          ))}
        </div>
        <ButtonStartRecipe />
        <ShareButton />
        <FavoriteButton />
      </div>
    )
    : (
      <div className="conteiner">
        <div
          data-testid="recipe-title"
        >
          { detailsItem.strMeal }
        </div>
        <img
          data-testid="recipe-photo"
          src={ detailsItem.strMealThumb }
          alt={ detailsItem.strMeal }
          width="100px"
          height="100px "
        />
        <div
          data-testid="recipe-category"
        >
          Category:
          { detailsItem.strCategory }
        </div>
        <iframe
          title={ detailsItem.strMeal }
          data-testid="video"
          src={ detailsItem.strYoutube.replace('watch?v=', 'embed/') }
        />
        <div
          data-testid="instructions"
        >
          Instructions:
          { detailsItem.strInstructions }
        </div>
        <div>
          Ingredients:
          { filterIngredients.map((ingredientes, index) => (
            <div
              key={ index }
            >
              <div
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredientes.name }
              </div>
            </div>
          ))}
          { filterMeasure.map((measure, indice) => (
            <div
              key={ indice }
            >
              <div
                data-testid={ `${indice}-ingredient-name-and-measure` }
              >
                { measure.name }
              </div>
            </div>
          ))}
        </div>
        <div>
          Recommended:
          { recommended.map((recome, index) => (
            <div
              key={ index }
            >
              <div
                data-testid={ `${index}-recomendation-card` }
              >
                { recome }
              </div>
            </div>
          ))}
        </div>
        <ButtonStartRecipe />
        <ShareButton />
        <FavoriteButton />
      </div>
    )
)
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

RecipeDetails.defaultProps = {
  location: {
    pathname: '',
  },
};
