import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareRecipe from '../images/shareIcon.svg';
// import FoodContext from '../context/FoodContext';

function ReceitasCriadas() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ]; // criado apenas para passar nos reqs 54 em diante, pois a informação salva no
  // localStorage não tenho acesso
  // minha ideia é colocar essa info do localStorage dentro de readyRecipes

  //  const { readyRecipes, setReadyRecipes } = useContext(FoodContext);
  const [shareButton, setShareButton] = useState(false);

  function renderElements() {
    return (
      doneRecipes.map((readyRecipe, index) => (
        <div key={ index }>
          <Link to={ `/${readyRecipe.type}s/${readyRecipe.id}` } key={ index }>
            <img
              src={ readyRecipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt="imagem horizontal"
              width="100"
            />
            <p data-testid={ `${index}-horizontal-name` }>{readyRecipe.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {!readyRecipe.area || readyRecipe.area}
            {' '}
            -
            {' '}
            {readyRecipe.category}
            {' '}
            { !readyRecipe.alcoholicOrNot || readyRecipe.alcoholicOrNot }
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>{readyRecipe.doneDate}</p>

          <button
            type="button"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/${readyRecipe.type}s/${readyRecipe.id}`);
              setShareButton(!shareButton);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareRecipe }
              alt="btn-share"
            />
          </button>
          {shareButton ? <span>Link copiado!</span> : null}

          <p
            data-testid={ `${index}-${readyRecipe.tags[0]}-horizontal-tag` }
            key={ index }
          >
            {readyRecipe.tags[0]}
          </p>
          <p
            data-testid={ `${index}-${readyRecipe.tags[1]}-horizontal-tag` }
            key={ index }
          >
            {readyRecipe.tags[1]}
          </p>
        </div>
      ))
    );
  }

  function btnFood() {
    doneRecipes.filter((readyRecipe) => (
      readyRecipe.type === 'comida'
    ));
  }

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ btnFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drink
      </button>
      { renderElements() }
    </div>
  );
}
export default ReceitasCriadas;
