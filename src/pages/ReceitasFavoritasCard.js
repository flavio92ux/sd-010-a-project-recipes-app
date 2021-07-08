import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ReceitasFavoritas.css';

const copy = require('clipboard-copy');

function ReceitasFavoritasCard({ props: { recipe, index, setFavoriteRecipes } }) {
  const [clipboardStatus, setClipboardStatus] = useState();

  const { area, alcoholicOrNot, category, id, name, image, type } = recipe;

  const shareClick = (e) => {
    e.preventDefault();

    if (type === 'comida') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }
    setClipboardStatus('copied');
  };

  const unfavoriteClick = (e) => {
    e.preventDefault();

    if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
      const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      const filterRecipes = oldRecipes.filter((actualRecipe) => actualRecipe.id !== id);

      const newRecipes = [...filterRecipes];

      console.log('New Recipe', newRecipes);
      console.log('Old Recipes', oldRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      setFavoriteRecipes(newRecipes);
    }
  };

  const createButtons = () => {
    console.log('recipe');
    return (
      <div>
        <button
          type="button"
          onClick={ shareClick }
        >
          <img
            alt="Share link"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <button type="button" onClick={ unfavoriteClick }>
          <img
            alt="Favorite button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          />
        </button>
      </div>
    );
  };

  const foodSpecs = () => (
    <span
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${area} - ${category}` }
    </span>
  );

  const drinkSpecs = () => (
    <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
  );

  return (
    <>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      <main>
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <img
            alt="Receita Favoritada"
            src={ image }
            className="img-card-favorite"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <div>
          { type === 'comida'
            ? foodSpecs()
            : drinkSpecs() }

          <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
            <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
          </Link>

          { createButtons() }
          {!clipboardStatus ? null : (<h5>Link copiado!</h5>)}
        </div>

      </main>
    </>
  );
}

ReceitasFavoritasCard.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default ReceitasFavoritasCard;
