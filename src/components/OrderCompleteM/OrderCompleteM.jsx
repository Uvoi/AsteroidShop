import React, { forwardRef, useContext } from 'react';
import './styles.css'
import complete_img from '../../images/complete_order.jpg'
import { Button, Link } from '@mui/material';
import { themeContext } from '../../App';

const OrderCompleteM = forwardRef(({deliveryDate=""}, ref)=>
{
    const theme = useContext(themeContext)
    return(
        <div ref={ref} id='OrderCompleteM' style={{background: theme.palette.background.paper}}>
            <img src={complete_img} alt="" />
            <div>
                <div>
                    <h1 style={{color: theme.palette.success.ultra}}>Заказ завершен успешно</h1> 
                    <span style={{color: theme.palette.text.secondary}}>Ваши товары будут доставлены {deliveryDate}. Детали заказа можно увидеть в профиле.</span>
                </div>
                <div id="OrderCompleteButtons">
                    <Button href='/' variant='contained'>На главную</Button>
                    <Button href='/profile/#ordersProf' variant='contained'>В профиль</Button>
                </div>
            </div>
        </div>
    );
});

export default OrderCompleteM;