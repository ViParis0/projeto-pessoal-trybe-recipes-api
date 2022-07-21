import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

function RecipeDetails({ location: { pathname }, id }) {
  useEffect(() => {
    if (pathname === '/drinks/:id') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      // .then((data) => console.log(data));
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      Ainda, nada!
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

RecipeDetails.defaultProps = {
  id: 0,
  location: {
    pathname: '',
  },
};

export default RecipeDetails;
