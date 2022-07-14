import React, { useContext } from 'react';
import MyContext from '../context/myContext';

export default function SearchBar() {
  const { handleSearch } = useContext(MyContext);
  return (
    <div>
      <label htmlFor="ingredients-radio">
        Ingredient
        <input
          name="radioInput"
          type="radio"
          id="ingredients-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleSearch }
        />
      </label>
      <label htmlFor="name-radio">
        Name
        <input
          name="radioInput"
          type="radio"
          id="name-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleSearch }
        />
      </label>
      <label htmlFor="first-letter-radio">
        First Letter
        <input
          name="radioInput"
          type="radio"
          id="first-letter-radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleSearch }
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}
