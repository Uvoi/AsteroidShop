import React from 'react';
import './styles.css'
import ProductCard from '../ProductCard/ProductCard';


const ProductsContainer = ({theme="", children})=>
{
    return(
        <div className='ProductsContainer'>
            {children}
        </div>
    );
};

export default ProductsContainer;