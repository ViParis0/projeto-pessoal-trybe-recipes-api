import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import StaticFilters from '../component/StaticFilters';
import detailContext from '../context/detailContex';
import ShareButton from '../component/ShareButton';
import FavoriteButton from '../component/FavoriteButton';

export default function FavoriteRecipes() {
  const { favoriteRecipes, getDoneRecipes,
    setFavoriteRecipes } = useContext(detailContext);
  useEffect(() => getDoneRecipes(), []);

  return (
    <>
      <Header
        pageName="Favorite Recipes"
        shouldSearch={ false }
        className="ingredientsAndMeasures"
      />
      <StaticFilters />
      <div>
        {
          favoriteRecipes.map((recipeFav, index) => (
            <div
              key={ recipeFav.id }
              className="flex justify-between
              bg-white p-1 rounded shadow m-2"
            >
              <div className="w-1/2">
                <Link
                  to={ `/${recipeFav.type}s/${recipeFav.id}` }
                >
                  <img
                    className="w-52"
                    src={ recipeFav.image }
                    alt={ recipeFav.name }
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
                  {recipeFav.alcoholicOrNot}
                  {`${recipeFav.nationality} - ${recipeFav.category}`}
                </span>
                <span
                  data-testid={ `${index}-horizontal-name` }
                  className="text-3xl"
                >
                  {recipeFav.name}
                </span>
                <div className="flex justify-around">
                  <ShareButton
                    testId={ `${index}-horizontal-share-btn` }
                    recipeId={ recipeFav.id }
                    type={ recipeFav.type }
                  />
                  <FavoriteButton
                    testIdFav={ `${index}-horizontal-favorite-btn` }
                    alt={ recipeFav.name }
                    id={ recipeFav.id }
                    setFavoriteRecipes={ setFavoriteRecipes }
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
