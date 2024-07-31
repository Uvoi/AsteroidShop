import React, { useContext } from 'react';
import './styles.css'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { themeContext } from '../../App';
import OrderProduct from '../OrderProduct/OrderProduct';
import OrderProductsContainer from '../OrderProduct/OrderProductsContainer/OrderProductsContainer';


const OrderItem = ({productIds, totalPrice, orderDate, DeliveryAddress, deliveryDate, orderStatus})=>
{
    const theme = useContext(themeContext)
    var statusColor = orderStatus=='В доставке'?theme.palette.success.main:(orderStatus=='Отменен'?theme.palette.error.main:theme.palette.text.secondary)


    return(
        <div className='OrderItem' style={{background: theme.palette.background.paper2}}>
            <Accordion>
                <AccordionSummary
                    className='orderItemHeader'
                    aria-controls="panel1a-content"
                    style={{color: theme.palette.text.primary}}
                >
                    <h3>Заказ от {orderDate} ({productIds.length})</h3>
                    <div>
                        <h4>{String(totalPrice)}.000 <sub>₽</sub></h4>
                        <h4 style={{color: statusColor}}>{orderStatus}</h4>
                    </div>
                </AccordionSummary>
                <AccordionDetails className='orderItemData'>
                    <OrderProductsContainer>
                        {productIds.map((product, index) => (
                            console.log(product),
                            <OrderProduct
                                key= {`${product}-${index}`}
                                nonPrice
                                id={product}
                            />
                        ))}
                    </OrderProductsContainer>
                    <div className="orderItemDeliveryData">
                        <h4>{DeliveryAddress}</h4>
                        <h4>Дата доставки: {deliveryDate}</h4>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default OrderItem;