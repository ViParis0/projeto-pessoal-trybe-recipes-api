import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import StaticFilters from '../component/StaticFilters';
import detailContext from '../context/detailContex';
import ShareButton from '../component/ShareButton';
import FavoriteButton from '../component/FavoriteButton';

export default function FavoriteRecipes() {
  const { favoriteRecipes, getFavoriteRecipes,
    setFavoriteRecipes } = useContext(detailContext);
  useEffect(() => getFavoriteRecipes(), []);

  return (
    <>
      <Header
        pageName="Favorite Recipes"
        shouldSearch={ false }
        className="ingredientsAndMeasures"
      />
      <StaticFilters
        className="ingredientsAndMeasures"
      />
      <div
        className="ingredientsAndMeasures"
      >
        {
          favoriteRecipes.map((recipeFav, index) => (
            <div
              key={ recipeFav.id }
            >
              <Link
                to={ `/${recipeFav.type}s/${recipeFav.id}` }
              >
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipeFav.alcoholicOrNot}
                  {`${recipeFav.nationality} - ${recipeFav.category}`}
                </span>
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipeFav.name}
                </span>
                <img
                  src={ recipeFav.image }
                  alt={ recipeFav.name }
                  width="150px"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
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
          ))
        }
      </div>
    </>
  );
}
