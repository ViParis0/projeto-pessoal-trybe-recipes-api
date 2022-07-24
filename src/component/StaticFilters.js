import React, { useContext } from 'react';
import detailContext from '../context/detailContex';

export default function StaticFilters() {
  const { doneFilter, getDoneRecipes } = useContext(detailContext);
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getDoneRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => doneFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => doneFilter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}
