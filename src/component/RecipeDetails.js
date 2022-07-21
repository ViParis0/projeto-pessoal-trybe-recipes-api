import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import detailContext from '../context/detailContex';

function RecipeDetails({ location: { pathname } }) {
  const { id } = useParams();
  const { handleFetch } = useContext(detailContext);
  useEffect(() => {
    handleFetch(pathname, id);
  }, []);

  // useEffect(() => {
  //   if (pathname === '/drinks/:id') {
  //     fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  //       .then((response) => response.json());
  //     // .then((data) => console.log(data));
  //   }
  //   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <div>
      Ainda, nada!
    </div>
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
