import React from 'react';
import PropTypes from 'prop-types';

export default function List({ list }) {
  return (
    <ul>
      { list.map((item, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { item }
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired,
};
