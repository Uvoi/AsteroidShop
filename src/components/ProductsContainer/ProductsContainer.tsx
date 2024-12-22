import React from 'react';
import './styles.css'
import ProductCard from '../ProductCard/ProductCard';


interface ProductsContainerProps
{
    children: React.ReactNode,
}

const ProductsContainer:React.FC<ProductsContainerProps> = ({children})=>
{
    return(
        <div className='ProductsContainer'>
            {children}
        </div>
    );
};

export default ProductsContainer;