import React, { useContext, useState } from 'react';
import './styles.css'
import { useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import { ReactComponent as BasketSvg } from './../../images/basket.svg'
import {addToBasket} from '../../functions/basket'
import { themeContext } from '../../App';
import { Check } from '@mui/icons-material';


const ProductCard = ({cardId, prdtTitle, prdtDescription, prdtWeight, prdtCategory="", prdtPrice, imgLink=""})=>
{
    let navigate = useNavigate();
    const theme = useContext(themeContext)
    const [isAdding, setIsaAdding] = useState(false)

    const handleAddToBasketClick = async () =>
    {
        setIsaAdding(true)
        await addToBasket([cardId])
        setTimeout(() => {
            setIsaAdding(false)
        }, 1000);
    }
    return( 
        <div id={'ProductCard_'+cardId} className='ProductCard' style={{color: theme.palette.text.secondary}}>
            <div className="prdtImgData">
                <img src={imgLink} onClick={()=>{navigate('/asteroid?id='+cardId)}} alt="" />
                <span style={{color: theme.palette.text.primary}}>{prdtCategory}</span>
            </div>
            <div className="prdtData">
                <h3 style={{color: theme.palette.text.primary}}>{prdtTitle}</h3>
                <p>{prdtDescription}</p>
                <div className="prdtNumberData_Button">
                    <div className="prdtNumberData" style={{color: theme.palette.text.primary}}>
                        <span>{prdtWeight} тонн</span>
                        <span>{prdtPrice} тыс. ₽</span>
                    </div>
                    <Button className='prdtBasketBtn' 
                    style={{
                        backgroundColor: 
                        (isAdding?theme.palette.success.main:theme.palette.primary.main), 
                        color:theme.palette.text.primary,
                        }}
                        onClick={handleAddToBasketClick}
                        >
                        {isAdding?<Check/>:<BasketSvg filter='invert(100%)'/>}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;