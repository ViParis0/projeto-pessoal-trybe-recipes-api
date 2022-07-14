import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, shouldSearch }) {
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
      {shouldSearch && <img
        src={ searchIcon }
        alt="ícone de pesquisa"
        data-testid="search-top-btn"
      />}
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
