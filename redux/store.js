import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '../slices/cart.slice'
import { stockReducer } from '../slices/stock.slice';

const reducer = {
  cart: cartReducer,
  stock: stockReducer,
};

const store = configureStore({
  reducer,
});

export default store;