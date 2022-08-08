import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Profile() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    const emailLocal = localStorage.getItem('user');
    if (emailLocal) {
      const parseEmail = JSON.parse(emailLocal);
      setEmail(parseEmail.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <>
      <Header pageName="Profile" shouldSearch={ false } />
      <p
        className="text-4xl text-center"
        type="text"
        data-testid="profile-email"
      >
        {email}
      </p>
      <div className="flex flex-col items-center">
        <button
          className="bg-stone-300 p-4 rounded-lg mt-10 w-1/2 border-white border-4"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="bg-stone-300 p-4 rounded-lg mt-10 w-1/2 border-white border-4"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="bg-stone-300 p-4 rounded-lg mt-10 w-1/2 border-white border-4"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
