import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const loadCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = loadCartItemsFromLocalStorage();

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const { id } = action.payload;
            const isItemInCart = state.some((item: { id: any; }) => item.id === id);
            if (!isItemInCart) {
                state.push(action.payload);
                localStorage.setItem('cartItems', JSON.stringify(state));
            }
            return state;
        },
        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload;
            const updatedState = state.filter((item: { id: any; }) => item.id !== productIdToRemove);
            localStorage.setItem('cartItems', JSON.stringify(updatedState));
            return updatedState;
        },
        updateQuantity: (state, action: PayloadAction<{ productId: any; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const itemToUpdate = state.find((item: { id: any; }) => item.id === productId);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
                localStorage.setItem('cartItems', JSON.stringify(state));
            }
        },
    },
});


export const { addToCart, removeFromCart, updateQuantity } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
