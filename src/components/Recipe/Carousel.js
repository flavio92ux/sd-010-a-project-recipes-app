import { arrayOf, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import CarouselCard from './CarouselCard';
import '../../styles/carousel.css';

function divide(dividend, divisor) {
  if (dividend > divisor) return divide((dividend - divisor), divisor);
  if (dividend < 0) return divide((dividend + divisor), divisor);
  return dividend % divisor;
}

function Carousel({ items }) {
  const [position, setPosition] = useState(0);
  const [leftItem, setLeftItem] = useState({});
  const [rightItem, setRightItem] = useState({});
  useEffect(() => {
    setLeftItem(divide(position, items.length));
    setRightItem(divide(position + 1, items.length));
  }, [items, position]);
  return (
    <div className="carousel-container">
      <button
        type="button"
        className="carousel-previous icones-btn"
        onClick={ () => setPosition(position - 1) }
      >
        {'<'}
      </button>
      <div className="carousel-frame">
        {items.map(({ title, alcoholic, imgLink }, index) => (
          <CarouselCard
            key={ title }
            title={ title }
            alcoholic={ alcoholic }
            link={ imgLink }
            index={ index }
            isVisible={ index === leftItem || index === rightItem }
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-next icones-btn"
        onClick={ () => setPosition(position + 1) }
      >
        {'>'}
      </button>
    </div>
  );
}

Carousel.propTypes = {
  items: arrayOf(shape({})).isRequired,
};

export default Carousel;
