import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

export default function FoodByArea() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Origem</h1>
        <SearchButton />
      </Header>
    </div>
  );
}
