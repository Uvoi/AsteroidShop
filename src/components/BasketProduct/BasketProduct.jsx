import React from 'react';
import './styles.css';
import pass from '../../images/pass.jpg';
import { Button } from '@mui/material';
import basket from './../../images/basket.svg';

const BasketProduct = ({ theme="", prdtTitle, prdtDescription, prdtWeight, prdtCategory="", prdtPrice, imgLink="", onRemove }) => {
    return (
        <div className='ProductCard'>
            <button className="removeBtn" onClick={onRemove}>×</button>
            <div className="prdtImgData">
                <img src={imgLink ? imgLink : pass} alt="" />
                <span>{prdtCategory}</span>
            </div>
            <div className="prdtData">
                <h3>{prdtTitle}</h3>
                <p>{prdtDescription}</p>
                <div className="prdtNumberData_Button">
                    <div className="prdtNumberData">
                        <span>{prdtWeight} тонн - {prdtPrice} тыс. ₽</span>
                    </div>
                    <Button className='prdtBasketBtn'>
                        <img src={basket} alt="" style={{ filter: `invert(100%)` }} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BasketProduct;
