import React from 'react';
import Header from '../component/Header';

export default function DoneRecipes() {
  return (
    <>
      <Header pageName="Done Recipes" shouldSearch={ false } />
      <h1>Done Recipes</h1>
    </>
  );
}
