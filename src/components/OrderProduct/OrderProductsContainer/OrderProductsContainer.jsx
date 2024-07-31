import React from 'react';
import './styles.css'


const OrderProductsContainer = ({children})=>
{
    return(
        <div id='orderProductsContainer'>
            {children}
        </div>
    );
};

export default OrderProductsContainer;