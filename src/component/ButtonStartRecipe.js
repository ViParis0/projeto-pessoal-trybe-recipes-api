import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ButtonStartRecipe() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [nameButton, setNameButton] = useState('Start Recipe');

  const history = useHistory();

  const handleClick = () => {
    const JSON_DONE = JSON.parse(localStorage
      .getItem('doneRecipes'));
    const JSON_IN = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    if (typeof JSON_DONE[0].id === 'string') {
      setIsDisabled(true);
    }
    if (typeof JSON_IN === 'object') {
      setNameButton('Continue Recipe');
      setIsDisabled(false);
      history.push(`${pathname}/in-progress`);
    }
  };
  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        { nameButton }
      </button>
    </div>

  );
}
