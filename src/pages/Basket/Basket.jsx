import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import axios from 'axios';

import { useNotification } from '../../components/Notification/Notification';
import BasketProduct from '../../components/BasketProduct/BasketProduct';
import { getProdsFromLS, delProdFromBasket, clearBasket } from '../../functions/user/user';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Basket = ({ theme }) => {
  const showNotification = useNotification();
  const [prodData, setProdData] = useState([]);
  const [isDeleteProd, setIsDeleteProd] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  const initialLoad = useRef(true);

  const allProdsControl = useAnimation();

  useEffect(() => {
    const getProdsFormSer = () => {
      var prodIds = getProdsFromLS();
      axios
        .post(`http://localhost:8000/api/basket/getByMass`, prodIds, axios.defaults.withCredentials = true)
        .then(response => {
          console.log(response.data);
          parseProdsData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getProdsFormSer();
  }, [isDeleteProd]);

  const parseProdsData = data => {
    if (Array.isArray(data)) {
      const newData = data.map((item, index) => ({
        uniqueKey: `${item.id}-${index}`,
        id: item.id,
        title: item.title,
        description: item.description,
        weight: item.weight,
        price: item.price,
        category: item.category,
        diameter: item.diameter,
        imgLink: item.imgLink,
      }));
      setProdData(newData);
      if (newData.length > 0) {
        setElementsVisible(true);
      }
    } else {
      console.error('Полученные данные не являются массивом');
    }
  };

  const deleteProd = uniqueKey => {
    const itemToDelete = prodData.find(product => product.uniqueKey === uniqueKey);
    delProdFromBasket(itemToDelete.id);
    setProdData(prevData => {
      const newData = prevData.filter(product => product.uniqueKey !== uniqueKey);
      if (newData.length === 0 && !initialLoad.current) {
        setElementsVisible(false);
      }
      return newData;
    });
  };

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
    } else if (prodData.length === 0) {
      setElementsVisible(false);
    }
  }, [prodData]);

  async function resetBasket()
  {
    await allProdsControl.start({
      x: 1900,
      height: 0,
      transition: { duration: 0.5 },
    })
    clearBasket()
    setIsDeleteProd(!isDeleteProd)
  }

  return (
    <div id='Basket' style={{ backgroundColor: theme.palette.background.paper }}>
      <div id="basket">
      <motion.div id='basketProducts' animate={allProdsControl}>
        {prodData.map(product => (
          <BasketProduct
            key={product.uniqueKey}
            id={product.id}
            uniqueKey={product.uniqueKey}
            theme={theme}
            prdtDiameter={product.diameter}
            prdtTitle={product.title}
            prdtDescription={product.description}
            prdtWeight={product.weight}
            prdtPrice={product.price}
            prdtCategory={product.category}
            imgLink={product.imgLink}
            deleteFunc={deleteProd}
          />
        ))}
        </motion.div>
        <AnimatePresence>
          {!elementsVisible && !initialLoad.current && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            id='emptyBasket'
            >
            <h3 style={{ color: theme.palette.text.primary }}>Корзина пуста</h3>
            <Button href="/catalog" variant='contained'>В каталог</Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {elementsVisible && (
            <motion.div
              id="buttonsBas"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, padding:0, transition: { duration: 0.5 } }}
            >
              <Button variant='contained' onClick={resetBasket}>Очистить корзину</Button>
              <Button variant='contained'>Заказать</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Basket;
