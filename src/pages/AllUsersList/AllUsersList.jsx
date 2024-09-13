import React from 'react';
import PaginationList from '../../components/PaginationList/PaginationList';
import { getAllUsers } from '../../functions/user';

const AllUsersList = ({props})=>
{
    return(
        <div id='AllUserList' >
            <PaginationList dataFunc={getAllUsers} title={'Пользователи'} width={70} link='/user?id='/>
        </div>
    );
};

export default AllUsersList;