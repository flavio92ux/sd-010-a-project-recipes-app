import React from 'react';
import { shape, string } from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

function MealsComponent({ data: { meals } }) {
  const maxArrayLength = 12;

  if (meals === null) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!meals) return <div>Loading...</div>;
  if (meals.length === 1) {
    return <Redirect to={ `comidas/${meals[0].idMeal}` } />;
  }

  return (
    <main>
      { meals.map(({ strMeal, strMealThumb, idMeal }, index) => (
        index < maxArrayLength ? (
          <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
            <button type="button" data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </button>
          </Link>
        ) : false
      )) }
    </main>
  );
}

MealsComponent.propTypes = { data: shape(
  { strMeal: string, strMealThumb: string },
) }.isRequired;

export default MealsComponent;
