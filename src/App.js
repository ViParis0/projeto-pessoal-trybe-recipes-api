import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DetailProvider from './context/DetailProvider';
import Provider from './context/MyProvider';

export default function App() {
  return (
    <Provider>
      <DetailProvider>
        <div className="meals conteiner">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/foods/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
            <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
            <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </div>
      </DetailProvider>
    </Provider>
  );
}
