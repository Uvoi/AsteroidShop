import React, { useState, useEffect, useRef, useContext } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import axios from 'axios';

import { useNotification } from '../../components/Notification/Notification';
import BasketProduct from '../../components/BasketProduct/BasketProduct';
import { getProdsFromLS, delProdFromBasket} from '../../functions/user/user';
import { motion, AnimatePresence} from 'framer-motion';
import { themeContext } from '../../App';


const Basket = () => {
  const theme = useContext(themeContext)
  const showNotification = useNotification();
  const [prodData, setProdData] = useState([]);
  const [elementsVisible, setElementsVisible] = useState(false);
  const initialLoad = useRef(true);
  const [summOfChecked, SetSummOfChecked] = useState(0);
  const [isDelAll, setIsDellAll] = useState(false);

  useEffect(() => {
    const getProdsFormSer = () => {
      var prodIds = getProdsFromLS();
      axios
        .post(`http://localhost:8000/api/basket/getByMass`, prodIds, axios.defaults.withCredentials = true)
        .then(response => {
          parseProdsData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    getProdsFormSer();
  }, []);

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
        checked: true,
      }));
      setProdData(newData);
      let updatedProdData = updateCheckedStatus(newData);
      setProdData(updatedProdData);
      if (newData.length > 0) {
        setElementsVisible(true);
      }
    } else {
      console.error('Полученные данные не являются массивом');
    }
  };

  const updateCheckedStatus = (prodData) => {
    const newProdData = [...prodData];
    const countMap = new Map();
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('countOfProd')) {
        const id = key.replace('countOfProd', '');
        const count = parseInt(localStorage.getItem(key), 10);
        countMap.set(id, count);
      }
    }
    newProdData.forEach(product => {
      const count = countMap.get(product.id.toString()) || 0;
      if (count > 0) {
        product.checked = true;
        countMap.set(product.id.toString(), count - 1);
      } else {
        product.checked = false;
      }
    });
  
    return newProdData;
  };
  

  const deleteProd = (uniqueKey) => {
    const itemToDelete = prodData.find(product => product.uniqueKey === uniqueKey);
    if (itemToDelete.checked)
      localStorage.setItem('countOfProd'+itemToDelete.id, Number(localStorage.getItem('countOfProd'+itemToDelete.id))-1)
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
    SetSummOfChecked(getSummOfChecked())
  }, [prodData]);


  useEffect(() => {
    var str = String(summOfChecked)
    SetSummOfChecked(str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.'))
  }, [summOfChecked]);


  function resetBasket() {
    setIsDellAll(true);
    setTimeout(() => {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('countOfProd') || key.startsWith('countProd')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }, 2000);
  }
  


  const setChecked = (uKey) =>
    {
      prodData.forEach(product => {
        if (product.uniqueKey == uKey)
          {
            product.checked=!product.checked
            if (product.checked)
              localStorage.setItem('countOfProd'+uKey[0], Number(localStorage.getItem('countOfProd'+uKey[0]))+1)
            else 
              localStorage.setItem('countOfProd'+uKey[0], Number(localStorage.getItem('countOfProd'+uKey[0]))-1)
          }
      });
      SetSummOfChecked(getSummOfChecked())
    }


  const getSummOfChecked = () =>
    {
      var summ = 0
      prodData.forEach(product => {
        if (product.checked == true)
          {
            summ += product.price;
          }
      });
      return summ;
    }
      


  return (
    <div id='Basket' style={{ backgroundColor: theme.palette.background.paper }}>
      <div id="basket">
      <div id='basketProducts'>
        {prodData.map(product => (
          <BasketProduct
            key={product.uniqueKey}
            id={product.id}
            uniqueKey={product.uniqueKey}
            prdtDiameter={product.diameter}
            prdtTitle={product.title}
            prdtDescription={product.description}
            prdtWeight={product.weight}
            prdtPrice={product.price}
            prdtCategory={product.category}
            imgLink={product.imgLink}
            check={product.checked}
            deleteFunc={deleteProd}
            checkFunc={setChecked}
            delAllFlag={isDelAll}
          />
        ))}
        </div>
        <AnimatePresence>
          {!elementsVisible && !initialLoad.current && (
            <motion.div
            initial={{ opacity: 0 , transition: { duration: 0 }}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            id='emptyBasket'
            >
            <h3 style={{ color: theme.palette.text.primary }}>Корзина пуста</h3>
            <Button href="/catalog" variant='contained'>В каталог</Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {elementsVisible && !initialLoad.current && (
            <motion.div
              id="buttonsBas"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, padding:0, transition: { duration: 0.5 } }}
            >
              <Button variant='contained' color='secondary' onClick={resetBasket}>Очистить корзину</Button>
              <div>
                <h2 style={{ color: theme.palette.text.primary }}>{summOfChecked}.000 <sub>₽</sub></h2>
                <Button href='/basket/order' variant='contained'>Заказать</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Basket;
