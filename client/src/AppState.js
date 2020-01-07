import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

//this delicious lil js file provides state for entire app
//redux seemed like too much

export const StateProvider = ({reducer, initialState, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);