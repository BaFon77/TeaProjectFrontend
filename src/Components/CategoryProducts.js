import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryStyle.css';
import { useAppDispatch } from "../store";
import { addToCart } from "../store/cartItemsReducer";

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8084/api/catalog/${category}`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        };

        fetchCategoryProducts();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div>
            <h1>Товары в категории {category}</h1>
            <main>
                {products.map((product) => (
                    <div key={product.id} className='item'>
                        <img src={"../img/" + "houjicha.jpg"} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <b>{product.price} ₽</b>
                        <div className='add-to-cart' onClick={() => addToCartHandler(product)}>+</div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default CategoryProducts;
