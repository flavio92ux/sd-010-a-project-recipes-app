import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { FoodProvider } from './Context/FoodProvider';
import Login from './Pages/Login';
import FoodPage from './Pages/FoodPage';
import BeveragePage from './Pages/BeveragePage';
import ProfilePage from './Pages/ProfilePage';
import DetailsPage from './Pages/DetailsPage';
import ExplorePage from './Pages/ExplorePage';
import ProgressPage from './Pages/ProgressPage';
import './App.css';
import DoneRecipes from './Pages/DoneRecipes';

function App() {
  return (
    <FoodProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ FoodPage } />
          <Route exact path="/comidas/:id" component={ DetailsPage } />
          <Route exact path="/comidas/:id/in-progress" component={ ProgressPage } />
          <Route exact path="/bebidas" component={ BeveragePage } />
          <Route exact path="/bebidas/:id" component={ DetailsPage } />
          <Route exact path="/bebidas/:id/in-progress" component={ ProgressPage } />
          <Route exact path="/perfil" component={ ProfilePage } />
          <Route exact path="/explorar" component={ ExplorePage } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        </Switch>
      </BrowserRouter>
    </FoodProvider>
  );
}

export default App;
