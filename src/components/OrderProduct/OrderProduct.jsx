import React, { useContext } from 'react';
import './styles.css';
import { themeContext } from '../../App';

const OrderProduct = ({ id, imgLink, price}) => {
    const theme = useContext(themeContext)
    return (
        <a style={{ color: theme.palette.text.primary }} className='OrderProduct' href={'/asteroid?id=' + id}>
            <img src={imgLink} alt="asteroid" />
            <p>{price}.000 <sub>₽</sub></p>
        </a>
    );
};

export default OrderProduct;


