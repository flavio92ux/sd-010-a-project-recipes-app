import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ComidasInProgress from '../../components/BebidasInProgress';
import { fetchFoodDetails } from '../../services/fetchFoodDetails';

function ComidasProgresso() {
  const { pathname } = useLocation();
  const [data, setData] = useState('');
  const minSlice = 9;
  const maxSlice = -12;
  const id = pathname.slice(minSlice, maxSlice);
  async function fetchAPI() {
    const { meals } = await fetchFoodDetails(id);
    setData(meals[0]);
  }

  useEffect(() => {
    fetchAPI();
  });

  return data === '' ? <h2>Loading...</h2> : <ComidasInProgress data={ data } />;
}

export default ComidasProgresso;
