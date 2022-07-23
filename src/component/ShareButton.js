// recebe um data test id como prop
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ testId, recipeId, type }) {
  const [copySuccess, setCopySuccess] = useState('');
  const history = useRouteMatch();

  const handleShare = () => {
    const TWO_SECONDS = 2000;
    if (history.url === '/done-recipes') {
      console.log('entrou');
      copy(`http://localhost:3000/${type}s/${recipeId}`);
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), TWO_SECONDS);
    } else {
      copy(`http://localhost:3000${history.url.replace('/in-progress', '')}`);
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), TWO_SECONDS);
    }
  };

  return (
    <div>
      {copySuccess}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          data-testid={ testId }
          src={ shareIcon }
          alt="share icon"
        />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
  recipeId: PropTypes.string,
  type: PropTypes.string,
};

ShareButton.defaultProps = {
  recipeId: '',
  type: '',
};
