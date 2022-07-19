import React from 'react';
import PropTypes from 'prop-types';

function Card({ type, strDrinkThumb, strDrink, index, strMealThumb, strMeal }) {
  return (
    type === 'drink'
      ? (
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
        </div>)
      : (
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
};

Card.defaultProps = {
  type: '',
  strDrinkThumb: '',
  strDrink: '',
  index: 0,
  strMealThumb: '',
  strMeal: '',
};

export default Card;
