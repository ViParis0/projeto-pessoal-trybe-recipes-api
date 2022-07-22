// recebe um data test id e uma função como prop
import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function Button({ testId, handleClick }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ handleClick }
    >
      <img src={ shareIcon } alt="share icon" />
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.any,
  testId: PropTypes.any,
  text: PropTypes.any,
}.isRequired;
