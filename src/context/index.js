import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [disableButton, setDisableButton] = useState(true);

  const updateData = async (api) => setData(await api);

  const contextValue = { data, updateData, disableButton, setDisableButton };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
