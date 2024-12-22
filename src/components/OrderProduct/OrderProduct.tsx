import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import './styles.css';
import { getProduct } from '../../functions/product';
import { useTheme } from '../../themes/ThemeProvider';

interface OrderProductProps
{
    id: number,
    imgLink?: string,
    price?: number,
    nonPrice?: boolean,
}

const OrderProduct: React.FC<OrderProductProps> = ({ id, imgLink="", price=0, nonPrice = false }) => {
    const [gettedImgLink, setGettedImgLink] = useState(imgLink);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const getProd = async () => {
            const prod = await getProduct(id);
            if (prod) {
                setGettedImgLink(prod.imgLink);
            } else {
                console.error('Товар не найден');
            }
        };
    
        if (!imgLink) {
            getProd();
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
