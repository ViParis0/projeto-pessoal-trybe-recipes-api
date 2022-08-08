import React, { useContext } from 'react';
import detailContext from '../context/detailContex';

export default function StaticFilters() {
  const { doneFilter, getDoneRecipes } = useContext(detailContext);
  return (
    <div className="flex flex-wrap justify-around">
      <button
        className="bg-stone-300 p-1 w-1/3 border-white border-4"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getDoneRecipes }
      >
        All
      </button>
      <button
        className="bg-stone-300 p-1 w-1/3 border-white border-4"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => doneFilter('food') }
      >
        Food
      </button>
      <button
        className="bg-stone-300 p-1 w-1/3 border-white border-4"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => doneFilter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}
