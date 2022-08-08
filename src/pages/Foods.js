import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Card from '../component/Card';
import Footer from '../component/Footer';
import Header from '../component/Header';
import MyContext from '../context/myContext';
import Recipes from '../component/Recipes';
import SearchBar from '../component/SearchBar';

const LIMIT_OF_ARR = 12;
const LIMIT_OF_CATE = 5;

export default function Foods() {
  const history = useHistory();
  const [showMeals, setShowMeals] = useState(false);
  const [limitedMeals, setLimitedMeals] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const {
    setGetPage,
    getMeals,
    setGetMeals,
    setFilterCategories,
    filterCategories,
    // filterCategories,
    toggleBar,
  } = useContext(MyContext);
  useEffect(() => setGetPage('foods'), []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setGetMeals(data.meals));
  }, []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setFilterCategories(data.meals.slice(0, LIMIT_OF_CATE)));
  }, []);

  useEffect(() => {
    if (!getMeals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (getMeals.length === 1) {
      history.push(`/foods/${getMeals[0].idMeal}`);
    } else {
      const limitedArr = getMeals.slice(0, LIMIT_OF_ARR);
      setLimitedMeals(limitedArr);
      setShowMeals(true);
    }
  }, [getMeals]);

  const handleCLick = (category) => {
    if (showAll) {
      setShowAll(false);
      setLimitedMeals(getMeals.slice(0, LIMIT_OF_ARR));
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => setLimitedMeals(data.meals.slice(0, LIMIT_OF_ARR)));
      setShowAll(true);
    }
  };

  const handleAll = () => {
    if (showAll) {
      setShowAll(false);
      setLimitedMeals(getMeals.slice(0, LIMIT_OF_ARR));
    }
    setShowAll(true);
  };

  return (
    <div className="bg-stone-200">
      <Header pageName="Foods" />
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
      <div className="flex flex-wrap justify-around w-full">
        {showMeals && <Recipes
          limitedRecipes={ limitedMeals }
        />}
      </div>
      <Footer />
    </div>
  );
}
