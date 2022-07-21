import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';

// { /* <span className="logo">TRYBE</span>
// <object
//   className="rocksGlass"
//   type="image/svg+xml"
//   data={ rockGlass }
// >
//   Glass
// </object> */ }

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/drinks/:id/in-progress" component={ InProgress } />
        <Route path="/foods/:id/in-progress" component={ InProgress } />
      </Switch>
    </div>
  );
}

export default App;
