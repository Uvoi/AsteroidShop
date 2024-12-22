import React from 'react';
import './styles.css'


interface OrdersListProps
{
    children: React.ReactNode,
}

const OrdersList: React.FC<OrdersListProps> = ({children})=>
{
    return(
        <div className='OrdersList'>
            {children}
        </div>
    );
};

export default OrdersList;