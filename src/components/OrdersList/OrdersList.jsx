import React from 'react';
import './styles.css'


const OrdersList = ({children})=>
{
    return(
        <div className='OrdersList'>
            {children}
        </div>
    );
};

export default OrdersList;