import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.amount += action.payload.amount;
      } else {
        state.push({ ...action.payload });
      }
    },
    changeAmount: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.amount = action.payload.amount;
      if (item.amount === 0) {
        const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1);
    },
    resetCart: () => initialState,
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  changeAmount,
  removeFromCart,
  resetCart
} = cartSlice.actions;