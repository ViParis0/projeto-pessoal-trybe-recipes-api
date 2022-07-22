import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whitekHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton() {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
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
