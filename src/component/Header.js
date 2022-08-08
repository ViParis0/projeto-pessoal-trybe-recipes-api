import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import myContext from '../context/myContext';

export default function Header({ pageName, shouldSearch }) {
  const { toggleBar, setToggleBar } = useContext(myContext);
  function handleClick() {
    setToggleBar(!toggleBar);
  }
  return (
    <div className="flex justify-around bg-green-300 items-baseline">
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="icone de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <div>
        <h1
          data-testid="page-title"
        >
          { pageName }
        </h1>
      </div>
      {shouldSearch
        && (
          <div>
            <button type="button" onClick={ handleClick }>
              <img
                src={ searchIcon }
                alt="ícone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          </div>
        )}
    </div>
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
