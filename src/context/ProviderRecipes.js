import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function ProviderRecipes({ children }) {
  const [filteredRecipe, setRecipes] = useState([]);
  const [activeFilter, setFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);
  const [dataDrinkCards, setDataDrinkCards] = useState('');
  const [loadingCards, setLoadingCards] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [countries, setCountries] = useState([]);
  // const [filteredByCountry, setFilteredByCountry] = useState([]);
  const [alertOn, setAlertOn] = useState(false);
  const [updateFlag, setUpadateFlag] = useState(false);
  const [ingredientsSearch, setIngredientsSearch] = useState(false);
  const [inProgressId, setInProgressRecipe] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const toogleInProgressRecipe = (idRecipe) => {
    const newInProgressState = idRecipe === inProgressId ? '' : idRecipe;
    setInProgressRecipe(newInProgressState);
  };

  const turnOnAlert = () => {
    setAlertOn(true);
    const waitTime = 2000;
    setTimeout(() => { setAlertOn(false); }, waitTime);
  };

  const getCategories = async (type) => {
    const siteName = type === 'Meal' ? 'meal' : 'cocktail';
    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/list.php?c=list`;
    const dbCategories = await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => response[`${type.toLowerCase()}s`])
      .catch((error) => console.log(error));
    const newCategories = ['All'];
    dbCategories.forEach((category) => newCategories.push(category.strCategory));
    setCategories(newCategories);
  };
  const getRecipes = async (category = 'All', type = 'Meal') => {
    const siteName = type === 'Meal' ? 'meal' : 'cocktail';
    let recipeList = [];
    if (category !== 'All') {
      const categoryEndpoint = `https://www.the${siteName}db.com/api/json/v1/1/filter.php?c=${category}`;
      recipeList = await fetch(categoryEndpoint)
        .then((response) => response.json())
        .then((response) => response[`${type.toLowerCase()}s`]);
    } else {
      const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/search.php?s=`;
      recipeList = await fetch(endpoint)
        .then((response) => response.json())
        .then((response) => response[`${type.toLowerCase()}s`]);
      recipeList = recipeList.map((item) => ({
        [`id${type}`]: item[`id${type}`],
        [`str${type}`]: item[`str${type}`],
        [`str${type}Thumb`]: item[`str${type}Thumb`],
      }));
    }
    setRecipes(recipeList);
    setIngredientsSearch(false);
  };

  const fetchByIngredients = async (ingredient, type) => {
    setIngredientsSearch(true);
    const siteName = type === 'Meal' ? 'meal' : 'cocktail';
    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const recipesByIngredient = await fetch(endpoint)
      .then((response) => response.json())
      .then((response) => response[`${type.toLowerCase()}s`]);
    setRecipes(recipesByIngredient);
    setIngredientsSearch(false);
  };
  // Esta função retorna o endpoint da API baseado no filtro escolhido
  const chooseEndpoint = (link) => {
    let endpoint = '';
    if (radioFilter === 'nome') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/search.php?s=${search}`;
    }
    if (radioFilter === 'ingrediente') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/filter.php?i=${search}`;
    }
    if (radioFilter === 'primeira-letra') {
      endpoint = `https://www.the${link}.com/api/json/v1/1/search.php?f=${search}`;
    }
    return endpoint;
  };
  // esta função vai fazer a solicitação das receitas e
  // aplicar os filtros devidos
  const fetchRecipes = async (link) => {
    const type = link === 'mealdb' ? 'Meal' : 'Drink';
    const endpoint = chooseEndpoint(link);
    setLoadingCards(true);
    const response = await fetch(endpoint)
      .then((r) => r.json())
      .then((r) => r[`${type.toLowerCase()}s`])
      .catch((error) => console.log(error));
    setLoadingCards(false);
    setRecipes(response);
    setIngredientsSearch(false);
  };

  const fetchArea = async () => {
    const areaCategory = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((req) => req.json())
      .then((res) => res.meals);
    const area = ['All'];
    areaCategory.forEach((country) => {
      area.push(country.strArea);
    });
    setCountries(area);
  };

  const fetchByCountry = async (dropDownValue) => {
    // const noFilter = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    //   .then((req) => req.json())
    //   .then((res) => console.log(res.meals));
    if (dropDownValue !== 'All') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${dropDownValue}`;
      const getByCountry = await fetch(endpoint)
        .then((req) => req.json())
        .then((res) => console.log(res.meals));
      // getByCountry.forEach((meal) => {
      //   setFilteredByCountry(meal);
      // });
      console.log(getByCountry);
    }
  };

  return (
    <ContextRecipes.Provider
      value={ {
        activeFilter,
        setFilter,
        filteredRecipe,
        getRecipes,
        categories,
        getCategories,
        search,
        setSearch,
        radioFilter,
        setRadioFilter,
        searchBtn,
        setSearchBtn,
        fetchRecipes,
        dataDrinkCards,
        setDataDrinkCards,
        loadingCards,
        setLoadingCards,
        showSearchBar,
        setShowSearchBar,
        fetchArea,
        countries,
        setCountries,
        fetchByCountry,
        // filteredByCountry,
        alertOn,
        turnOnAlert,
        updateFlag,
        setUpadateFlag,
        ingredientsSearch,
        fetchByIngredients,
        inProgressId,
        toogleInProgressRecipe,
        isCompleted,
        setIsCompleted,
      } }
    >
      { children }
    </ContextRecipes.Provider>
  );
}
ProviderRecipes.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;
export default ProviderRecipes;
