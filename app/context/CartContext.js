'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.product.id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.quantity;
        return updatedCart;
      } else {
        return [...state, { ...action.product, quantity: action.quantity }];
      }
    case 'UPDATE_CART':
      return state.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.productId);
    case 'SET_CART':
      return action.cart;
    case 'CLEAR_CART':
      return []; // Initialize cart from localStorage
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', cart: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
