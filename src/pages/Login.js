import React, { useContext, useEffect } from 'react';

import MyContext from '../context/myContext';

export default function Login() {
  const { login: { email, senha },
    handleChange, isDisabled, handleDisabled, handleSubmit } = useContext(MyContext);
  useEffect(handleDisabled, [email, senha]);
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        E-mail:
        <input
          id="email"
          type="text"
          data-testid="email-input"
          placeholder="exemplo@exemplo.com"
          value={ email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="senha">
        Senha:
        <input
          id="senha"
          type="password"
          data-testid="password-input"
          placeholder="Mínimo de 6 caracteres"
          value={ senha }
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
}
