import React from 'react';

const Product = () => {
    return (
        <div>
            <div className='item'>
                <h1>Товары в категории {category}</h1>
                <div>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;