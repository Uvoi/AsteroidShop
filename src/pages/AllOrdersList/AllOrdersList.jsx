import React from 'react';
import PaginationList from '../../components/PaginationList/PaginationList';
import { getAllOrders } from '../../functions/order';

const AllOrdersList = ({props})=>
{
    return(
        <div id='AllOrdersList' >
            <PaginationList dataFunc={getAllOrders} title={'Заказы'} width={100} link='/user?id='/>
        </div>
    );
};

export default AllOrdersList;