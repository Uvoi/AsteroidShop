import React from 'react';
import { useLocation } from 'react-router-dom';

import './styles.css'
import RegLogM from '../../components/RegLogM/RegLogM';

interface UnloginedProps
{
    updateUser: () => void;
}

const Unlogined: React.FC<UnloginedProps> = ({updateUser})=>
{
    const location = useLocation()
    
    const from = location.state?.from?.pathname || '/'
    
    return(
        <div id='Unlogined' >
            <RegLogM goto={from} updateUser={updateUser} action={false} close={()=>null}/>
        </div>
    );
};

export default Unlogined;