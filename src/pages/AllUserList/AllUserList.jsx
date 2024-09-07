import React from 'react';
import PaginationList from '../../components/PaginationList/PaginationList';
import { getAllUsers } from '../../functions/user';

const AllUserList = ({props})=>
{
    return(
        <div id='AllUserList' >
            <PaginationList dataFunc={getAllUsers} title={'Пользователи'} width={70}/>
        </div>
    );
};

export default AllUserList;