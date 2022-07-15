import React from 'react';
import Header from '../component/Header';

export default function FavoriteRecipes() {
  return (
    <>
      <Header pageName="Favorite Recipes" shouldSearch={ false } />
      <h1>Favorite Recipes</h1>
    </>
  );
}
