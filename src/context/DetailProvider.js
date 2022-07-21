import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './detailContex';

export default function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);

  const handleFetch = (type, id) => {
    if (type.includes('foods')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setFood(data.meals[0]));
    }

    if (type.includes('drinks')) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setDrink(data.drinks[0]);
        });
    }
  };

  return (
    <MyContext.Provider value={ { handleFetch, food, drink } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
