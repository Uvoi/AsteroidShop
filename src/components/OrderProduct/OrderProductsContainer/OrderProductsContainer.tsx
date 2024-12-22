import React from 'react';
import './styles.css'


interface OrderProductsContainerProps
{
    children: React.ReactNode,
}

const OrderProductsContainer: React.FC<OrderProductsContainerProps> = ({children})=>
{
    return(
        <div id='orderProductsContainer'>
            {children}
        </div>
    );
};

export default OrderProductsContainer;