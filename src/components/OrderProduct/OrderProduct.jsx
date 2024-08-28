import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { themeContext } from '../../App';

import './styles.css';

const OrderProduct = ({ id, imgLink, price, nonPrice=false}) => {
    const [gettedImgLink, setGettedImgLink] = useState()
    const theme = useContext(themeContext)

    useEffect(() => {
        const getProdFormSer = () => {
          axios
            .get(`http://localhost:8000/api/products/`+id, axios.defaults.withCredentials = true)
            .then(response => {
                setGettedImgLink(response.data.imgLink)
            })
            .catch(error => {
              console.error(error);
            });
        };

        !imgLink && getProdFormSer();
      }, []);


    return (
        <Link style={{ color: theme.palette.text.primary }} className='OrderProduct' to={'/asteroid?id=' + id}>
            <img src={imgLink?imgLink:gettedImgLink} alt="asteroid" />
            {!nonPrice &&
                <p>{price}.000 <sub>₽</sub></p>
            }
        </Link>
    );
};

export default OrderProduct;


