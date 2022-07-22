// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

export default function ButtonStartRecipe() {
  const [isVisabled, setIsVisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const { id } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const LOCAL_DONE = localStorage
      .getItem('doneRecipes');
    const LOCAL_PROGRESS = localStorage
      .getItem('inProgressRecipes');

    if (LOCAL_DONE) {
      const JSON_DONE = JSON.parse(LOCAL_DONE);
      setIsVisabled(!JSON_DONE.some((done) => done.id === id));
    }
    if (LOCAL_PROGRESS && url.includes('foods')) {
      const JSON_PROGRESS = JSON.parse(LOCAL_PROGRESS);
      setIsDisabled(Object.keys(JSON_PROGRESS.meals).some((meal) => meal === id));
    }
    if (LOCAL_PROGRESS && url.includes('drinks')) {
      const JSON_PROGRESS = JSON.parse(LOCAL_PROGRESS);
      setIsDisabled(Object.keys(JSON_PROGRESS.cocktails).some((drink) => drink === id));
    }
    if (isDisabled) {
      setIsVisabled(false);
    }
  }, []);

  const handleClick = () => {
    history.push(`${url}/in-progress`);
  };

  return (
    <div>
      {isVisabled && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed"
          onClick={ handleClick }
        >
          Start Recipe
        </button>
      )}

      {isDisabled && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed"
        >
          Continue Recipe
        </button>
      )}
    </div>

  );
}
