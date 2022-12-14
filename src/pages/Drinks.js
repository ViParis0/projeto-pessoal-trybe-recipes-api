import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import MyContext from '../context/myContext';
// import Card from '../component/Card';
import Recipes from '../component/Recipes';
import RecipeDetails from './RecipeDetails';
import SearchBar from '../component/SearchBar';

const LIMIT_OF_ARR = 12;
const LIMIT_OF_CATE = 5;

export default function Drinks() {
  const history = useHistory();
  const [showDrinks, setShowDrinks] = useState(false);
  const [limitedDrinks, setLimitedDrinks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // const [isFiltered, setIsFiltered] = useState(false);
  const {
    setGetPage,
    getDrinks,
    setGetDrinks,
    setFilterCategories,
    filterCategories,
    toggleBar,
  } = useContext(MyContext);

  useEffect(() => setGetPage('drinks'), []);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setGetDrinks(data.drinks));
  }, []);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setFilterCategories(data.drinks.slice(0, LIMIT_OF_CATE)));
  }, []);

  useEffect(() => {
    if (!getDrinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (getDrinks.length === 1) {
      history.push(`/drinks/${getDrinks[0].idDrink}`);
    } else {
      const limitedArr = getDrinks.slice(0, LIMIT_OF_ARR);
      setLimitedDrinks(limitedArr);
      setShowDrinks(true);
    }
  }, [getDrinks]);

  const handleCLick = (category) => {
    if (showAll) {
      setShowAll(false);
      setLimitedDrinks(getDrinks.slice(0, LIMIT_OF_ARR));
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => setLimitedDrinks(data.drinks.slice(0, LIMIT_OF_ARR)));
      setShowAll(true);
    }
  };

  const handleAll = () => {
    if (showAll) {
      setShowAll(false);
      setLimitedDrinks(getDrinks.slice(0, LIMIT_OF_ARR));
    }
    setShowAll(true);
  };

  return (
    <div className="bg-stone-200">
      <Header pageName="Drinks" />
      {toggleBar && <SearchBar />}
      <div className="flex flex-wrap justify-around">
        <button
          className="bg-stone-300 p-1 w-1/3 border-white border-4"
          data-testid="All-category-filter"
          type="button"
          onClick={ handleAll }
        >
          All
        </button>
        {filterCategories.map((cate, i) => (
          <button
            className="bg-stone-300 p-1 w-1/3 border-white border-4"
            key={ i }
            data-testid={ `${cate.strCategory}-category-filter` }
            type="button"
            onClick={ () => handleCLick(cate.strCategory) }
          >
            {cate.strCategory}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around">
        {showDrinks && <Recipes
          limitedRecipes={ limitedDrinks }
          type="drinks"
        />}
      </div>
      <Footer />
      <RecipeDetails />
    </div>
  );
}
