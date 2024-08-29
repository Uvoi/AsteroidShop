import React, { useContext } from 'react';

import './styles.css'
import { themeContext } from '../../App';
import img404 from '../../images/404.avif'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Empty = ({props})=>
{
    const theme = useContext(themeContext)
    return(
        <div id='Empty' >
            <Link to='/'>
            <img src={img404} alt="404" />
            </Link>
            <h1 style={{color:theme.palette.text.ultra}}>Космический вакуум. Здесь нет ни астероидов, ни страниц.</h1>
            <Button variant='contained'><Link to='/'>На главную</Link></Button>
        </div>
    );
};

export default Empty;