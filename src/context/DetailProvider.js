import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './detailContex';

const SIX = 6;

export default function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [recommended, setRecommended] = useState();
  const [detailsItem, setDetailsItem] = useState({});
  const [filterIngredients, setFilterIngredients] = useState();
  const [filterMeasure, setFilterMeasure] = useState();
  const [doneRecipes, setDoneRecipes] = useState([]);

  const handleFetch = (type, id) => {
    if (type.includes('foods')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.meals[0]);
          setFood(data.meals[0]);
          setDetailsItem(data.meals[0]);
        });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setRecommended(data.drinks.slice(0, SIX));
        });
    }
    if (type.includes('drinks')) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.drinks[0]);
          setDrink(data.drinks[0]);
          setDetailsItem(data.drinks[0]);
        });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setRecommended(data.meals.slice(0, SIX));
        });
    }
  };

  const getDoneRecipes = () => {
    const newArr = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(newArr);
  };

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
    <MyContext.Provider
      value={ {
        handleFetch,
        food,
        drink,
        recommended,
        detailsItem,
        filterIngredients,
        filterMeasure,
        getDoneRecipes,
        doneRecipes,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
