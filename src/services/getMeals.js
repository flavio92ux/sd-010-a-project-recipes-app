const getIngredients = (recipe) => {
  const toGet = Object.entries(recipe);
  const ingredients = toGet.filter((key) => key[0].includes('Ingredient')
    && key[1] !== '').map((curr) => curr[1]);
  return ingredients;
}

const getMeasures = (recipe) => {
  const toGet = Object.entries(recipe);
  const measures = toGet.filter((key) => key[0].includes('Measure')
    && key[1] !== '').map((curr) => curr[1]);
  return measures;
}


const setMeals = (recipes) => {
  const mealsList = recipes.map((recipe) => {
    const {
      idMeal, strMeal, strCategory, strArea,
      strInstructions, strMealThumb, strTags,
    } = recipe;

    const ingredients = getIngredients(recipe);
    const measures = getMeasures(recipe);
    return ({
      id: idMeal,
      name: strMeal,
      category: strCategory,
      from: strArea,
      imgSrc: strMealThumb,
      tags: strTags,
      instructions: strInstructions,
      ingredients,
      measures,
    });
  });
  return mealsList;
}

const getMeals = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const data = await response.json()
  const { meals } = data;
  const dataFormat = setMeals(meals)
  return dataFormat;
}

export default getMeals;
