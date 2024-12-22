import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import './styles.css';
import complete_img from '../../images/complete_order.jpg';
import { useTheme } from '../../themes/ThemeProvider';

interface OrderCompleteMProps {
    deliveryDate: string;
}

const OrderCompleteM = forwardRef<HTMLDivElement, OrderCompleteMProps>(({ deliveryDate = '' }, ref) => {
    const { theme } = useTheme();

    return (
        <div ref={ref} id="OrderCompleteM" style={{ background: theme.palette.background.paper }}>
            <img src={complete_img} alt="Complete Order" />
            <div>
                <div>
                    <h1 style={{ color: theme.palette.success.ultra }}>Заказ завершен успешно</h1>
                    <span style={{ color: theme.palette.text.secondary }}>
                        Ваши товары будут доставлены {deliveryDate}. Детали заказа можно увидеть в профиле.
                    </span>
                </div>
                <div id="OrderCompleteButtons">
                    <Button variant="contained">
                        <Link to="/">На главную</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="/profile/#ordersProf">В профиль</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default OrderCompleteM;
