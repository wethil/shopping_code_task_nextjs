import { createSlice } from '@reduxjs/toolkit';
import data from "constants/data";


const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        products: [...data],
        orders: []
    },
    reducers: {
        createOrder: (state, action) => {
            const {orders, orderInfo} = action.payload;
            const orderHash = Object.assign({}, ...orders.map(o => ({[o.id]: o.amount})));
            state.products = [...state.products].map(item=>({
                ...item,
                stock: orderHash[item.id] ? item.stock - orderHash[item.id] : item.stock, 
            }))
            state.orders.push(orderInfo)

        }
    },
});


export const stockReducer = stockSlice.reducer;

export const {
    createOrder,
  } = stockSlice.actions;