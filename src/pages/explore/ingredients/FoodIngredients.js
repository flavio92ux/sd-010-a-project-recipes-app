import React from 'react';
import Header from '../../../components/Header';
import BottomMenu from '../../../components/bottomMenu';

export default function FoodIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" show={ false } />
      <BottomMenu />
    </div>
  );
}
