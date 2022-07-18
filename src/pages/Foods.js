import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../component/Card';
import Footer from '../component/Footer';
import Header from '../component/Header';
import MyContext from '../context/myContext';

export default function Foods() {
  const history = useHistory();
  const [showMeals, setShowMeals] = useState(false);
  const [limitedMeals, setLimitedMeals] = useState([]);
  const {
    setGetPage,
    getMeals,
    setGetMeals,
  } = useContext(MyContext);
  useEffect(() => setGetPage('foods'), []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setGetMeals(data.meals));
  }, []);

  useEffect(() => {
    if (!getMeals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (getMeals.length === 1) {
      history.push(`/foods/${getMeals[0].idMeal}`);
    } else {
      const LIMIT_OF_ARR = 12;
      const limitedArr = getMeals.slice(0, LIMIT_OF_ARR);
      setLimitedMeals(limitedArr);
      setShowMeals(true);
    }
  }, [getMeals]);

  return (
    <div>
      <Header pageName="Foods" />
      {showMeals && limitedMeals.map((meal, index) => (
        <Card
          key={ meal.idMeal }
          index={ index }
          strMealThumb={ meal.strMealThumb }
          strMeal={ meal.strMeal }
        />
      ))}
      <Footer />
    </div>
  );
}
