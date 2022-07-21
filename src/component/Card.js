import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function
Card({ type, strDrinkThumb, strDrink, index, strMealThumb, strMeal, id }) {
  return (
    type === 'drink'
      ? (
        <Link
          to={ {
            pathname: `drinks/${id}`,
          } }
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>
              {strDrink}
            </p>
            <img
              width="125px"
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>)
      : (
        <Link
          to={ {
            pathname: `foods/${id}`,
          } }
        >
          <div
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
