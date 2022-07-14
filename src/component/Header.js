import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pageName } = props;
  // const history = useHistory();
  return (
    <>
      <img
        src={ profileIcon }
        alt="icone de perfil"
        data-testid="profile-top-btn"
        // onClick={ () => history.push('/profile') }
      />
      <h1
        data-testid="page-title"
      >
        { pageName }
      </h1>
      <img
        src={ searchIcon }
        alt="ícone de pesquisa"
        data-testid="search-top-btn"
      />
      <button
        type="button"
        data-testid="search-input"
      >
        Search
      </button>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
