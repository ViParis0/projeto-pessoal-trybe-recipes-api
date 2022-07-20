import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Referência 01: Replace: usada para o vídeo do youtube pegar
// https://stackoverflow.com/questions/20498831/refused-to-display-in-a-frame-because-it-set-x-frame-options-to-sameorigin
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replace

function RecipeDetails({ location: { pathname } }) {
  const [detailsItem, setDetailsItem] = useState({});
  const [filterIngredients, setFilterIngredients] = useState();
  const [filterMeasure, setFilterMeasure] = useState();
  const [recommended, setRecommended] = useState();

  const ID = pathname.split('/')[2];
  // const VIDEO_MEALS = detailsItem.strYoutube.replace('watch?v=', 'embed/');

  useEffect(() => {
    if (pathname === `/drinks/${ID}`) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`)
        .then((response) => response.json())
        .then((data) => setDetailsItem(data.drinks[0]));
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecommended(data.meals.map((meal) => meal.strMeal)));
    }
    if (pathname === `/foods/${ID}`) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
        .then((response) => response.json())
        .then((data) => setDetailsItem(data.meals[0]));
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecommended(data.drinks.map((drink) => drink.strDrink)));
    }
  }, []);

  useEffect(() => {
    const FILTER_INGREDIENTS = Object.entries(detailsItem)
      .filter(([key, value]) => key
        .includes('strIngredient')
        && value)
      .map(([key, value]) => ({
        name: value,
        key,
      }));
    const FILTER_MEASURE = Object.entries(detailsItem)
      .filter(([keyM, valueM]) => keyM
        .includes('strMeasure')
        && valueM)
      .map(([key, value]) => ({
        name: value,
        key,
      }));
    setFilterIngredients(FILTER_INGREDIENTS);
    setFilterMeasure(FILTER_MEASURE);
  }, [detailsItem]);

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
              src={ detailsItem.strYoutube }
              // src={ detailsItem.strYoutube.replace('watch?v=', 'embed/') }
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

export default RecipeDetails;
