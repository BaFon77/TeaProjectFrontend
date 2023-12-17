import React, {useEffect, useState} from 'react';
import Login from "./Components/Login";
import {IRootState, useAppDispatch} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/auth/actionCreators";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./MainStyle.css"
import ShoppingCart from '../ShoppingCart';
import {addToCart} from "../../store/cartItemsReducer";

const Main = () => {

    const [products, setProducts] = useState<any>([]);

    const cartItems = useSelector((state: { cartItems: any[] }) => state.cartItems);



    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8084/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        };

        fetchCategoryProducts();
    }, []);


    // const addToCart = (product: { id: any; }) => {
    //     const existingItem = cartItems.find((item: { id: any; }) => item.id === product.id);
    //
    //     if (existingItem) {
    //         setCartItems(
    //             cartItems.map((item: { id: any; quantity: number; }) =>
    //                 item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    //             )
    //         );
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    // };

    const dispatch = useDispatch();

    // ... ваш существующий код

    const addToCartHandler = (product: any) => {
        dispatch(addToCart(product));
    };


    return (
        <div>
            <h2></h2>
            <main>
                {products.map((product: any) => (
                    <div key={product.id} className='item'>
                        <img src={"../img/" + "houjicha.jpg"} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <b>{product.price} ₽</b>
                        <div className='add-to-cart' onClick={() => addToCartHandler(product)}>+</div>
                    </div>
                ))}
            </main>

            <div>
                {/* Отображение корзины с передачей cartItems */}
                <ShoppingCart cartItems={cartItems} />
            </div>
        </div>
    );
};

export default Main;