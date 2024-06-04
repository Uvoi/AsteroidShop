import React from 'react';
import './styles.css'
import pass from '../../images/pass.jpg'
import { Button } from '@mui/material';
// import {} from '@mui/material'
import basket from './../../images/basket.svg'


const ProductCard = ({theme="", prdtImg="", prdtTitle, prdtDescription, prdtWeight, prdtCategory="", prdtPrice, imgLink=""})=>
{
    return( 
        <div className='ProductCard' style={{color: theme.palette.text.secondary}}>
            <div className="prdtImgData">
                <img src={imgLink?imgLink:pass} alt="" />
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
                        backgroundColor: theme.palette.primary.main, 
                        color:theme.palette.text.primary,
                        }}>
                        <img src={basket} alt="" style={{filter:`invert(100%)`}}/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;