import React, { useContext, useEffect } from 'react';
import DoneAndFavoriteRecipes from '../component/DoneAndFavoriteRecipes';
import Header from '../component/Header';
import StaticFilters from '../component/StaticFilters';
import detailContext from '../context/detailContex';

export default function DoneRecipes() {
  const { getDoneRecipes } = useContext(detailContext);
  useEffect(() => getDoneRecipes(), []);
  return (
    <>
      <Header pageName="Done Recipes" shouldSearch={ false } />
      <StaticFilters />
      <DoneAndFavoriteRecipes />
    </>
  );
}
