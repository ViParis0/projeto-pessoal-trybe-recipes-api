import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      className="fixed"
      data-testid="footer"
    >
      <Link
        to="/drinks"
      >
        <img
          src={ drinkIcon }
          alt="icone de bebida"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link
        to="/foods"
      >
        <img
          src={ mealIcon }
          alt="ícone de comida"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
