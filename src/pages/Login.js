import React, { useContext, useEffect } from 'react';

import MyContext from '../context/myContext';

export default function Login() {
  const { login: { email, senha },
    handleChange, isDisabled, handleDisabled, handleSubmit } = useContext(MyContext);
  useEffect(handleDisabled, [email, senha]);

  return (
    <div className="bg-stone-200 min-h-screen flex items-center justify-center">
      <form className="bg-white p-20 rounded-2xl shadow-lg" onSubmit={ handleSubmit }>
        <h1 className="text-5xl mb-10">Login</h1>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          E-mail:
          <input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="exemplo@exemplo.com"
            value={ email }
            onChange={ handleChange }
            className="shadow appearance-none border rounded
             w-full py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline"
          />
        </label>
        <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">
          Senha:
          <input
            id="senha"
            type="password"
            data-testid="password-input"
            placeholder="Mínimo de 6 caracteres"
            value={ senha }
            onChange={ handleChange }
            className="shadow appearance-none border border-red-500
            rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
             focus:outline-none focus:shadow-outline"
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
         rounded focus:outline-none focus:shadow-outline"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
