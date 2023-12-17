import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReduce'
import { useDispatch } from 'react-redux'

import logger from 'redux-logger'
import cartItemsReducer from "./cartItemsReducer";

const savedCartItems = localStorage.getItem('cartItems');

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartItems: cartItemsReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
    preloadedState: {
        // Установить состояние корзины из localStorage
        cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
    },
})


export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types