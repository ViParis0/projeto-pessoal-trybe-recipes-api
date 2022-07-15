<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
=======
import React, { useContext, useEffect } from 'react';
import Footer from '../component/Footer';
>>>>>>> 02517a95a4cc2b79a281190c83112671af4ff012
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
      {showMeals && limitedMeals.map((drink) => (
        <div key={ drink.idMeal }>
          <p>{drink.strMeal}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
