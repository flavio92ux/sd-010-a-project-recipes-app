import React, { useContext, useEffect } from 'react';
import { Header, MealsCategories, MealsComponent, Footer } from '../../components';
import { Context } from '../../context';
import { fecthByName } from '../../services/api';

function Meals() {
  const { data, updateData } = useContext(Context);

  useEffect(() => {
    if (!data.meals) { updateData(fecthByName('', true)); }
  }, [data, updateData]);

  if (!data) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Comidas" search />
      <MealsCategories />
      <MealsComponent data={ data } />
      <Footer />
    </section>
  );
}

export default Meals;
