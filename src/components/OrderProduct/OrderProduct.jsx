import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { themeContext } from '../../App';
import { Skeleton } from '@mui/material';

import './styles.css';

const OrderProduct = ({ id, imgLink, price, nonPrice = false }) => {
    const [gettedImgLink, setGettedImgLink] = useState(imgLink);
    const [loading, setLoading] = useState(true);
    const theme = useContext(themeContext);

    useEffect(() => {
        if (!imgLink) {
            const getProdFormSer = () => {
                axios
                    .get(`http://localhost:8000/api/products/` + id, { withCredentials: true })
                    .then(response => {
                        setGettedImgLink(response.data.imgLink);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };

            getProdFormSer();
        }
    }, [imgLink, id]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Link style={{ color: theme.palette.text.primary }} className='OrderProduct' to={'/asteroid?id=' + id}>
            {loading && (
                <Skeleton variant="rectangular" width={'100%'} height={'100px'} />
            )}
            <img 
                src={gettedImgLink} 
                alt="asteroid" 
                onLoad={handleImageLoad}
                onError={() => setLoading(false)}
                style={{ display: loading ? 'none' : 'block'}}
            />
            {!nonPrice &&
                <p>{price}.000 <sub>₽</sub></p>
            }
        </Link>
    );
};

export default OrderProduct;
