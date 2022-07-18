import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import MyContext from '../context/myContext';
import Card from '../component/Card';

export default function Drinks() {
  const history = useHistory();
  const [showDrinks, setShowDrinks] = useState(false);
  const [limitedDrinks, setLimitedDrinks] = useState([]);
  const {
    setGetPage,
    getDrinks,
    setGetDrinks,
  } = useContext(MyContext);
  useEffect(() => setGetPage('drinks'), []);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setGetDrinks(data.drinks));
  }, []);

  useEffect(() => {
    if (!getDrinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (getDrinks.length === 1) {
      history.push(`/drinks/${getDrinks[0].idDrink}`);
    } else {
      const LIMIT_OF_ARR = 12;
      const limitedArr = getDrinks.slice(0, LIMIT_OF_ARR);
      setLimitedDrinks(limitedArr);
      setShowDrinks(true);
    }
  }, [getDrinks]);
  return (
    <>
      <Header pageName="Drinks" />
      {showDrinks && limitedDrinks.map((drink, index) => (
        <Card
          key={ drink.idDrink }
          index={ index }
          strDrinkThumb={ drink.strDrinkThumb }
          strDrink={ drink.strDrink }
          type="drink"
        />
      ))}
      <h1>Drinks</h1>
      <Footer />
    </>
  );
}
