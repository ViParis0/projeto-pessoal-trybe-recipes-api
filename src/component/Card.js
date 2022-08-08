import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function
Card({ type, strDrinkThumb, strDrink, index, strMealThumb, strMeal, id }) {
  return (
    type === 'drink'
      ? (
        <div className="w-1/2">
          <Link
            to={ {
              pathname: `drinks/${id}`,
            } }
          >
            <div
              className="bg-white px-4 py-2 mb-1 mt-2 rounded-2xl shadow-lg"
              data-testid={ `${index}-recipe-card` }
            >
              <span data-testid={ `${index}-card-name` }>
                {strDrink}
              </span>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        </div>
      )
      : (
        <div className="w-1/2">
          <Link
            to={ {
              pathname: `foods/${id}`,
            } }
          >
            <div
              className="bg-white px-4 py-2 mb-1 mt-2 rounded-2xl shadow-lg"
              data-testid={ `${index}-recipe-card` }
            >
              <p data-testid={ `${index}-card-name` }>
                {strMeal}
              </p>
              <img
                width="125px"
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </Link>
        </div>
      )
  );
}

Card.propTypes = {
  type: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strDrink: PropTypes.string,
  index: PropTypes.number,
  strMealThumb: PropTypes.string,
  strMeal: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Card.defaultProps = {
  type: '',
  strDrinkThumb: '',
  strDrink: '',
  index: 0,
  strMealThumb: '',
  strMeal: '',
};
