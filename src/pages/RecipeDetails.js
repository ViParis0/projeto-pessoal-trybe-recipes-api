/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
/* eslint-disable max-lines */
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
      <div>
        <img
          className="w-full h-48"
          data-testid="recipe-photo"
          src={ detailsItem.strDrinkThumb }
          alt={ detailsItem.strDrink }
          width="100px"
          height="100px"
        />
        <div className="bg-white m-1">
          <div className="flex justify-between items-baseline">
            <p
              className="text-center text-6xl"
              data-testid="recipe-title"
            >
              { detailsItem.strDrink }
            </p>
            <div className="flex items-baseline justify-around w-1/5">
              <ShareButton testId="share-btn" />
              <FavoriteButton
                id={ id }
                type="drink"
                nationality=""
                category={ detailsItem.strCategory }
                alcoholicOrNot={ detailsItem.strAlcoholic }
                name={ detailsItem.strDrink }
                image={ detailsItem.strDrinkThumb }
                testIdFav="favorite-btn"
                alt={ detailsItem.strMeal }
              />
            </div>
          </div>
          <p
            className="text-gray-400"
            data-testid="recipe-category"
          >
            { detailsItem.strAlcoholic }
          </p>
          <div className="bg-gray-300">
            Ingredients and Measures:
            <div className="flex">
              <div className="flex flex-col">
                { filterIngredients.map((ingredients, index) => (
                  <span
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredients.name }
                  </span>
                ))}
              </div>
              <div className="flex flex-col">
                { filterMeasure.map((measure, ind) => (
                  <span
                    key={ ind }
                    data-testid={ `${ind}-ingredient-name-and-measure` }
                  >
                    { measure.name }
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-300 my-3">
            <p data-testid="instructions">
              { `Instructions: ${detailsItem.strInstructions}` }
            </p>
          </div>
          <div className="flex overflow-x-auto gap-1 snap-x snap-mandatory ">
            Recommended:
            { recommended.map((recom, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="flex-none snap-start shrink-0 w-1/2"
              >
                <div>
                  <img
                    src={ recom.strMealThumb }
                    alt={ recom.strMeal }

                  />
                </div>

                <div>
                  <p className="text-center">
                    {`${recom.strMeal} - ${recom.strCategory}`}
                  </p>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recom.strMeal }
                  </p>
                </div>

              </div>
            ))}
          </div>
          <ButtonStartRecipe />
        </div>
      </div>
    )
    : (
      <div>
        <img
          className="w-full h-48"
          data-testid="recipe-photo"
          src={ detailsItem.strMealThumb }
          alt={ detailsItem.strMeal }
          width="100px"
          height="100px "
        />
        <div className="bg-white m-1">
          <div className="flex justify-between items-baseline">
            <p
              className="text-center text-6xl"
              data-testid="recipe-title"
            >
              { detailsItem.strMeal }
            </p>
            <div className="flex items-baseline justify-around w-1/5">
              <ShareButton testId="share-btn" />
              <FavoriteButton
                id={ id }
                type="food"
                nationality={ detailsItem.strArea }
                category={ detailsItem.strCategory }
                alcoholicOrNot=""
                name={ detailsItem.strMeal }
                image={ detailsItem.strMealThumb }
                testIdFav="favorite-btn"
                alt={ detailsItem.strDrink }
              />
            </div>
          </div>
          <p
            className="text-gray-400"
            data-testid="recipe-category"
          >
            { detailsItem.strCategory }
          </p>
          <div className="bg-gray-300">
            Ingredients and Measures:
            <div className="flex">
              <div className="flex flex-col">
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
              </div>
              <div className="flex flex-col">
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
            </div>
          </div>
          <div className="bg-gray-300 my-3">
            <p
              data-testid="instructions"
            >
              {`Instructions: ${detailsItem.strInstructions}`}
            </p>
          </div>
          <div className="flex">
            <iframe
              title={ detailsItem.strMeal }
              data-testid="video"
              src={ detailsItem.strYoutube.replace('watch?v=', 'embed/') }
            />
          </div>
          <br />
          <div className="flex overflow-x-auto gap-1 snap-x snap-mandatory ">
            Recommended:
            { recommended.map((recome, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="flex-none snap-start shrink-0 w-1/2"
              >
                <div>
                  <img
                    src={ recome.strDrinkThumb }
                    alt={ recome.strDrink }

                  />
                </div>
                <div className="text-center">
                  <p>
                    {`${recome.strAlcoholic} - ${recome.strDrink}`}
                  </p>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { recome.strDrink }
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ButtonStartRecipe />
        </div>
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
