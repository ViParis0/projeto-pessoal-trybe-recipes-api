import React, { useContext } from 'react';
import MyContext from '../context/myContext';

export default function SearchBar() {
  const {
    handleSearch,
    recipeTypeInput,
    setRecipeTypeInput,
    handleClickSearch,
  } = useContext(MyContext);

  return (
    <div className="flex-col justify-center bg-green-300 items-center">
      <div>
        <input
          className="w-full"
          type="text"
          placeholder="Search Recipe"
          data-testid="search-input"
          value={ recipeTypeInput }
          onChange={ (e) => setRecipeTypeInput(e.target.value) }
        />
      </div>
      <div className="flex justify-around">
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
      </div>
      <div
        className="text-center rounded bg-grenn-900 border-2 border-black justify-center"
      >
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClickSearch }
        >
          Search
        </button>
      </div>
    </div>
  );
}
