import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context/Recipes';
import Header from '../../components/Header';
import RecipesCardsGrid from '../../components/RecipesCardsGrid';
import Categories from './components/Categories';
import Carousel from '../../components/Carousel';
import Footer from '../../components/footer';

import styles from './styles.module.scss';

function MainRecipes() {
  const { titlePage, loadRecipes } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    loadRecipes(pathname);
  }, [pathname, loadRecipes]);

  return (
    <div className={ styles.mainRecipes }>
      <Header title={ titlePage } />
      <div className={ styles.carousel }>
        <Carousel>
          <Categories />
        </Carousel>
      </div>
      <main>
        <RecipesCardsGrid />
      </main>
      <Footer />
    </div>
  );
}

export default MainRecipes;
