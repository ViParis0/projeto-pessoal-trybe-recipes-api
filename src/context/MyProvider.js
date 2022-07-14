import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './myContext';

const LOGIN_INPUTS = { email: '', senha: '' };

function Provider({ children }) {
  const [login, setLogin] = useState(LOGIN_INPUTS);
  const [isDisabled, setIsDisabled] = useState(true);
  const [getSearch, setGetSearch] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setLogin({
      ...login,
      [id]: value,
    });
  };

  function validateEmail() {
    const { email } = login;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleDisabled = () => {
    const { senha } = login;
    const validEmail = validateEmail();
    const MIN_PASSWORD_CHARACTER = 6;
    if (validEmail && senha.length > MIN_PASSWORD_CHARACTER) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  function setLocalStorage(key, content) {
    const newContent = JSON.stringify(content);
    localStorage.setItem(key, newContent);
  }

  const handleSubmit = (e) => {
    const { email } = login;
    e.preventDefault();
    const newObj = {
      email,
    };
    setLocalStorage('user', newObj);
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    history.push('/foods');
  };

  const handleSearch = ({ target }) => {
    const { value } = target;
    setGetSearch(value);
  };

  return (
    <MyContext.Provider
      value={ {
        login,
        handleChange,
        handleDisabled,
        isDisabled,
        handleSubmit,
        handleSearch,
        getSearch,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
