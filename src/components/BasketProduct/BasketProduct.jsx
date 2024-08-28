import React, { useContext, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Skeleton } from '@mui/material';

import './styles.css';
import { darkTheme } from '../../themes/theme';
import { themeContext } from '../../App';

const BasketProduct = ({prdtTitle, prdtDescription, prdtDiameter, prdtWeight, prdtCategory="", prdtPrice, imgLink="", id, uniqueKey, check, deleteFunc=null, checkFunc=null, delAllFlag }) => {
  const theme = useContext(themeContext);
  const [checked, setChecked] = useState(check);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  
  const returnWeightCategory = (weight) => {
    if ((weight > 0.000001) && (weight < 1)) 
      return 'Малый';
    if ((weight > 1) && (weight < 50))
      return 'Средний';
    if (weight > 50)
      return 'Большой';
  };

  const controls = useAnimation();

  const startAnimation = async () => {
    if (Math.floor(Math.random() * 2) === 1) {
      await controls.start({
        x: 2900,
        height: 0,
        opacity: 0,
        transition: { duration: 0.7 },
      });
    } else {
      await controls.start({
        x: -2900,
        height: 0,
        opacity: 0,
        transition: { duration: 0.7 },
      });
    }
    deleteFunc(uniqueKey);
  };

  useEffect(() => {
    if (delAllFlag === true) {
      deleteProduct();
    }
  }, [delAllFlag]);

  const deleteProduct = async () => {
    await startAnimation();
  };

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
    <motion.label className='BasketProduct' id={"BasketProductId=" + uniqueKey}
        animate={controls}
    >
      <div style={{ border: "1px solid " + theme.palette.primary.main }} className='basketProduct'>
        <div className="imgDataBP">
          {loading && (
            <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
          )}
          <img 
            src={imgLink} 
            onClick={() => { navigate('/asteroid?id=' + id) }} 
            alt="asteroid img" 
            onLoad={handleImageLoad}
            onError={() => setLoading(false)}
            style={{ display: loading ? 'none' : 'block'}}
          />
          <span style={prdtCategory === "Железный" ? { color: "#A0A0A0" } : (prdtCategory === "Каменный" ? { color: "#8f633f" } : { color:"#a18874" })}>
            {prdtCategory}
          </span>
        </div>
        <div className="prdtDataBP">
          <h3 style={{ color: theme.palette.text.ultra }}>{prdtTitle}</h3>
          <p style={{ color: theme.palette.text.secondary }}>{prdtDescription}</p>
          <div style={{ color: theme.palette.text.primary }} className="prdtNumberDataBP">
            <p>
              <span>{returnWeightCategory(prdtWeight)}</span>
              <span><span>{prdtWeight}</span> тонн</span>
              <span><span>{prdtDiameter}</span> км.</span>
            </p>
            <div className="cost_buyBtnBP">
              <h2>{prdtPrice}.000 <sub>₽</sub></h2>
              <Checkbox className='checkBBP' 
                checked={checked}
                onChange={(e) => { checkFunc(uniqueKey); setChecked(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Button variant='contained' className='buyNowBP' onClick={() => { !checked && checkFunc(uniqueKey); setChecked(true); }}>
                <Link to={'/basket/order/?id=' + id}>Купить</Link>
              </Button>
            </div>
          </div>
        </div>
        <button className="removeBtnBP" style={theme === darkTheme ? { filter: `invert(100%)` } : {}} onClick={deleteProduct} />
      </div>
    </motion.label>
  );
};

export default BasketProduct;
