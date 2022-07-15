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
  } = useContext(MyContext);
  useEffect(() => setGetPage('foods'), []);

  useEffect(() => {
    if (getMeals.length === 1) {
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
