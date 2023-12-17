import React from 'react';
import './ShoppingCartStyle.css';
import { useAppDispatch } from '../store';
import { removeFromCart } from '../store/cartItemsReducer';
import { FaTrash } from 'react-icons/fa';

const ShoppingCart = ({ cartItems }) => {
    const dispatch = useAppDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const getTotalPrice = () => {
        // Считаем общую сумму
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <ul>
                {cartItems && cartItems.length > 0 ? (
                    <div className="shop-cart-item">
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={"../img/" + "houjicha.jpg"} />
                                <h2>{item.name}</h2>
                                <p>{item.price}₽</p>
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
