import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, shouldSearch }) {
  const [toggleBar, setToggleBar] = useState(false);
  function handleClick() {
    setToggleBar(!toggleBar);
  }
  return (
    <>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="icone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1
        data-testid="page-title"
      >
        { pageName }
      </h1>
      {shouldSearch
        && (
          <button type="button" onClick={ handleClick }>
            <img
              src={ searchIcon }
              alt="ícone de pesquisa"
              data-testid="search-top-btn"
            />
          </button>
        )}
      {toggleBar && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
  shouldSearch: PropTypes.bool,
};

Header.defaultProps = {
  pageName: '',
  shouldSearch: true,
};

export default Header;
