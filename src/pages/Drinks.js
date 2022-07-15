import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import MyContext from '../context/myContext';

export default function Drinks() {
  const history = useHistory();
  const [showDrinks, setShowDrinks] = useState(false);
  const [limitedDrinks, setLimitedDrinks] = useState([]);
  const {
    setGetPage,
    getDrinks,
  } = useContext(MyContext);
  useEffect(() => setGetPage('drinks'), []);

  useEffect(() => {
    if (getDrinks.length === 1) {
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
      {showDrinks && limitedDrinks.map((drink) => (
        <div key={ drink.idDrink }>
          <p>{drink.strDrink}</p>
        </div>
      ))}
    </>
  );
}
