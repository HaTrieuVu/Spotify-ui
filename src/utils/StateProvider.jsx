import { createContext, useContext, useReducer } from 'react';

export const StateConText = createContext();

export const StateProvider = ({ children, initialState, reducer }) => (
    <StateConText.Provider value={useReducer(reducer, initialState)}>{children}</StateConText.Provider>
);

// gọi hàm này để lấy dữ liệu từ Context
export const useStateProvider = () => useContext(StateConText);
