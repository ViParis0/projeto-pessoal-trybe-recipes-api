// recebe um data test id e uma função como prop
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function Button() {
  const [copySuccess, setCopySuccess] = useState('');
  const history = useRouteMatch();

  const handleShare = () => {
    const TWO_SECONDS = 2000;
    copy(`http://localhost:3000${history.url.replace('/in-progress', '')}`);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), TWO_SECONDS);
  };

  return (
    <div>
      {copySuccess}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share icon"
        />
      </button>
    </div>
  );
}
