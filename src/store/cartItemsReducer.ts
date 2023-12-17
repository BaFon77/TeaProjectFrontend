import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Метод для получения данных из localStorage
const loadCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
};

// Инициализация хранилища Redux с данными из localStorage
const initialState = loadCartItemsFromLocalStorage();

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const updatedState = [...state, action.payload];
            localStorage.setItem('cartItems', JSON.stringify(updatedState));
            return updatedState;
        },
        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload;
            const updatedState = state.filter((item: { id: any; }) => item.id !== productIdToRemove);
            localStorage.setItem('cartItems', JSON.stringify(updatedState));
            return updatedState;
        },
        // Другие редукторы...
    },
});


export const { addToCart, removeFromCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
