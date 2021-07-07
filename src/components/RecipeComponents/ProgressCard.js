import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './ShareButton';
import FavBtn from './FavoriteButton';
import RecipeImage from './RecipeImage';
import RecipeTitle from './RecipeTitle';
import RecipeCatg from './RecipeCategory';
import RecipeInst from './RecipeInstructions';

const filterIngredients = (recipeItems) => Object.entries(recipeItems)
  .filter(([name, value]) => name.includes('Ingredient') && value);

const mountObject = (recipe) => {
  if (recipe.meals) {
    const { idMeal, strArea,
      strCategory, strMeal, strMealThumb, strInstructions } = recipe.meals[0];
    return {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      instructions: strInstructions,
      ingredients: filterIngredients(recipe.meals[0]),
    };
  }
  const { idDrink,
    strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipe.drinks[0];
  return {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    ingredients: filterIngredients(recipe.drinks[0]),
  };
};

function ProgressCard({ recipe }) {
  const locate = window.location.href.split('/in-progress')[0];
  const recipeInfo = mountObject(recipe);
  const { meals: foods } = recipe;
  const { id, image, name, category, alcoholicOrNot,
    ingredients, instructions } = recipeInfo;
  const lineThrough = 'line-through';
  const [isDisable, setIsDisable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const element = document.querySelectorAll('.input-ingredients');
    Object.values(element)
      .filter((el) => el.checked)
      .forEach((el) => {
        el.parentNode.style.textDecoration = lineThrough;
      });
  }, []);

  const enableButton = useCallback(() => {
    const inputs = document.querySelectorAll('.input-ingredients');
    const checkedsInputs = Object.values(inputs)
      .filter((el) => el.checked);
    if (checkedsInputs.length === ingredients.length) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [ingredients.length]);

  useEffect(() => {
    enableButton();
  }, [enableButton]);

  const changeTextDecoration = (parentNode) => {
    if (parentNode.style.textDecoration !== lineThrough) {
      parentNode.style.textDecoration = lineThrough;
    } else {
      parentNode.style.textDecoration = 'none';
    }
  };

  const lsMountMealsObject = (lsRecipe, valInt, minusOne) => {
    const { meals: food, cocktails } = lsRecipe;
    Object.entries(food).forEach(([idItem, val]) => {
      if (idItem === id) {
        const item = food[id];
        const index = item.indexOf(valInt);
        if (index > minusOne) {
          item.splice(index, 1);
          const object = { meals: { ...food, [id]: item }, cocktails };
          localStorage.setItem('inProgressRecipes', JSON.stringify(object));
        } else {
          const object = { meals: { ...food, [id]: [...val, valInt] }, cocktails };
          localStorage.setItem('inProgressRecipes', JSON.stringify(object));
        }
      }
    });
  };

  const lsMountDrinksObject = (lsRecipe, valInt, minusOne) => {
    const { meals, cocktails } = lsRecipe;
    Object.entries(cocktails).forEach(([itemId, val]) => {
      if (itemId === id) {
        const item = cocktails[id];
        const index = item.indexOf(valInt);
        if (index > minusOne) {
          item.splice(index, 1);
          const object = { meals, cocktails: { ...cocktails, [id]: item } };
          localStorage.setItem('inProgressRecipes', JSON.stringify(object));
        } else {
          const object = { meals, cocktails: { ...cocktails, [id]: [...val, valInt] } };
          localStorage.setItem('inProgressRecipes', JSON.stringify(object));
        }
      }
    });
  };

  const setLocalStorage = (lsRecipe, value) => {
    const minusOne = -1;
    const valInt = Number.parseInt(value, 10);

    if (foods) {
      lsMountMealsObject(lsRecipe, valInt, minusOne);
    } else {
      lsMountDrinksObject(lsRecipe, valInt, minusOne);
    }
  };

  const markAsDone = ({ target }) => {
    const { parentNode, value } = target;
    const lsRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    enableButton();
    setLocalStorage(lsRecipe, value);
    changeTextDecoration(parentNode);
  };

  const isChecked = (items, key) => items[1].filter((n) => {
    if (n === key) { return 'teste'; } return false;
  });

  const markedItems = () => {
    const lsItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (foods) {
      const { meals: food } = lsItems;
      const lsIngredients = Object.entries(food)
        .find(([i]) => i === id);
      return lsIngredients;
    }
    const { cocktails } = lsItems;
    const lsIngredients = Object.entries(cocktails)
      .find(([i]) => i === id);
    return lsIngredients;
  };

  const listIngredients = (recipeIngredients) => {
    let lsItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!lsItems) {
      lsItems = { meals: {}, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(lsItems));
    }
    if (foods) {
      const { meals, cocktails } = lsItems;
      if (Object.entries(meals).length === 0) {
        lsItems = { meals: { [id]: [] }, cocktails };
      } else if (!meals[id]) {
        lsItems = { meals: { ...meals, [id]: [] }, cocktails };
      } else {
        lsItems = { meals, cocktails };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(lsItems));
    } else {
      const { meals, cocktails } = lsItems;
      if (Object.entries(lsItems.cocktails).length === 0) {
        lsItems = { meals, cocktails: { [id]: [] } };
      } else if (!cocktails[id]) {
        lsItems = { meals, cocktails: { ...cocktails, [id]: [] } };
      } else {
        lsItems = { meals, cocktails };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(lsItems));
    }
    return (
      <ol className="ol-ingredients">
        {recipeIngredients.map((ingredient, key) => (
          <li className="li-ingredients" key={ key }>
            <label
              className="lbl-ingredients"
              htmlFor={ `ingredient${key}` }
              data-testid={ `${key}-ingredient-step` }
            >
              {ingredient[1]}
              <input
                className="input-ingredients"
                id={ `ingredient${key}` }
                type="checkbox"
                value={ key + 1 }
                onClick={ markAsDone }
                defaultChecked={ isChecked(markedItems(), key + 1)[0] }
              />
            </label>
          </li>))}
      </ol>
    );
  };

  const favoriteInfo = () => {
    delete recipeInfo.ingredients;
    delete recipeInfo.instructions;
    return ([recipeInfo]);
  };

  return (
    <div className="recipe_details">
      <RecipeImage origin={ image } />
      <RecipeTitle title={ name } />
      <ShareBtn dataTest="share-btn" path={ `${locate}` } />
      <FavBtn info={ favoriteInfo() } />
      <RecipeCatg category={ `${category} ${alcoholicOrNot}` } />
      <h3>Ingredientes</h3>
      {listIngredients(ingredients)}
      <h3>Instruções</h3>
      <RecipeInst instructions={ instructions } />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisable }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita

      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;
export default ProgressCard;
