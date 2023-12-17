import { createAction } from '@reduxjs/toolkit';

// Действие для добавления товара в корзину
export const addToCart = createAction<any>('ADD_TO_CART');

// Другие действия для обновления корзины, если нужно
export const removeFromCart = createAction<any>('REMOVE_FROM_CART');

// И другие действия, если необходимо
// ...
