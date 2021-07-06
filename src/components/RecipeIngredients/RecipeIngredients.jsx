import React from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/formatingService';
// import { formattingCarouselImgs } from '../../helpers/carouselData';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);

  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  // const imgsFormatted = formattingCarouselImgs(keysAndValues);
  // console.log(imgsFormatted);
  const { ingredients, measures } = formatting;

  return (
    <div className="ing">
      <ul>
        {ingredients.map((element, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { measures[index]}
            {' '}
            { element }
          </li>))}
      </ul>
    </div>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
