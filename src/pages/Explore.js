import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function Explore() {
  return (
    <section>
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <button data-testid="explore-food" type="button">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
      </Link>
      <Footer />
    </section>
  );
}

export default Explore;
