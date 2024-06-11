import React from 'react';
import './styles.css';
import pass from '../../images/pass.jpg';
import { Button, Checkbox } from '@mui/material';
import basket from './../../images/basket.svg';
import { lightTheme, darkTheme } from '../../themes/theme';
import { CheckBox } from '@mui/icons-material';

const BasketProduct = ({ theme="", prdtTitle, prdtDescription, prdtDiameter, prdtWeight, prdtCategory="", prdtPrice, imgLink="", onRemove }) => {
    const returnWeightCategory = (weight) => {
        if ((weight > 0.000001) && (weight < 1)) 
          return 'Малый'
        if ((weight > 1) && (weight < 50))
          return 'Средний'
        if (weight > 50)
          return 'Большой'
      };

    return (
        <div className='BasketProduct'>
            <div style={{border: "1px solid"+theme.palette.primary.main}} className='basketProduct'>
                <div className="imgDataBP">
                    <img src={imgLink ? imgLink : pass} alt="" />
                    <span style={prdtCategory == "Железный"?{color: "#A0A0A0"}:(prdtCategory == "Каменный"?{color: "#8f633f"}:{color:"#a18874"})}>{prdtCategory}</span>
                </div>
                <div className="prdtDataBP">
                    <h3 style={{color: theme.palette.text.ultra}}>{prdtTitle}</h3>
                    <p style={{color: theme.palette.text.secondary}}>{prdtDescription}</p>
                    <div style={{color: theme.palette.text.primary}} className="prdtNumberDataBP">
                        <p>
                            <span>{returnWeightCategory(prdtWeight)}</span>
                            <span><span>{prdtWeight}</span> тонн</span>
                            <span><span>{prdtDiameter}</span> км.</span>
                        </p>
                    <div className="cost_buyBtnBP">
                            <h2>{prdtPrice}.000 <sub>₽</sub></h2>
                            <Checkbox className='checkBBP' defaultChecked/>
                            <Button variant='contained' className='buyNowBP'>
                                Купить
                            </Button>
                        </div>
                    </div>
                </div>
                <button className="removeBtnBP" style={theme==darkTheme?{filter:`invert(100%)`}:{}} onClick={()=>console.log(theme==darkTheme)}/>
            </div>
        </div>
    );
};

export default BasketProduct;
