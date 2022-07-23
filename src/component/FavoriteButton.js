import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whitekHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ id, type, nationality, category,
  alcoholicOrNot, name, image }) {
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    const LOCAL_FAV = localStorage.getItem('favoriteRecipes');
    if (LOCAL_FAV) {
      const JSON_FAV = JSON.parse(LOCAL_FAV);
      setIsFav(JSON_FAV.some((fav) => fav.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  const handleFavorite = () => {
    const LOCAL_FAV = localStorage.getItem('favoriteRecipes');
    if (LOCAL_FAV && !isFav) {
      const JSON_FAV = JSON.parse(LOCAL_FAV);
      const newFav = {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...JSON_FAV, newFav]));
    }
    if (LOCAL_FAV && isFav) {
      const JSON_FAV = JSON.parse(LOCAL_FAV);
      const newJson = JSON_FAV.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newJson));
    }
    setIsFav(!isFav);
  };
  return (
    <button
      type="button"
      onClick={ handleFavorite }
    >
      <img
        data-testid="favorite-btn"
        src={ isFav ? blackHeartIcon : whitekHeartIcon }
        alt="favorite button"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
};

FavoriteButton.defaultProps = {
  id: '',
  type: '',
  nationality: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
};
