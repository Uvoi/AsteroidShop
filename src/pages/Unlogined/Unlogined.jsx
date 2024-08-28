import React from 'react';
import { useLocation } from 'react-router-dom';

import './styles.css'
import RegLogM from '../../components/RegLogM/RegLogM';

const Unlogined = ({updateUser})=>
{
    const location = useLocation()
    
    const from = location.state?.from?.pathname || '/'
    
    return(
        <div id='Unlogined' >
            <RegLogM goto={from} updateUser={updateUser}/>
        </div>
    );
};

export default Unlogined;