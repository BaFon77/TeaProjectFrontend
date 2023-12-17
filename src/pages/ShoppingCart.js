import React from 'react';
import './ShoppingCartStyle.css';
import { useAppDispatch } from '../store';
import { removeFromCart, updateQuantity } from '../store/cartItemsReducer';
import { FaTrash } from 'react-icons/fa';

const ShoppingCart = ({ cartItems }) => {
    const dispatch = useAppDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    const handleQuantityChange = (productId, quantity) => {
        const newQuantity = Math.max(quantity ?? 1, 1); // Ensure quantity is at least 1
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };

    return (
        <div>
            <ul>
                {cartItems && cartItems.length > 0 ? (
                    <div className="shop-cart-item">
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={"../img/" + "houjicha.jpg"} />
                                <div className="item-details">
                                    <div className="item-info">
                                        <h2>{item.name}</h2>
                                        <p>{item.price}₽</p>
                                    </div>
                                    <div className="item-quantity">
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                        {item.quantity ?? 1}
                                        <button onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}>+</button>
                                    </div>
                                </div>
                                <FaTrash onClick={() => removeFromCartHandler(item.id)} className='delete-icon' />
                            </li>
                        ))}
                        <div>Total: {getTotalPrice()}₽</div>
                    </div>
                ) : (
                    <li>Корзина пуста</li>
                )}
            </ul>
        </div>
    );
};

export default ShoppingCart;
