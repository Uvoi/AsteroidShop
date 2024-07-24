import React, { useContext, useEffect, useState } from 'react';
import './styles.css'
import OrderProduct from '../../components/OrderProduct/OrderProduct';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Checkbox, Divider, Modal, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { themeContext, userContext } from '../../App';
import { useNotification } from '../../components/Notification/Notification';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import SelectAddress from '../../components/SelectAddress/SelectAddress';





const Order = () =>
{
    const theme = useContext(themeContext)
    const user = useContext(userContext)

    const showNotification = useNotification();
    const [prodData, setProdData] = useState([]);
    const [summOfChecked, SetSummOfChecked] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [address, setAddress] = useState();
    const [saveAddress, setSaveAddress] = useState(false);


    const parseIdFromUrl = (urlParams) => {
        const prodId = urlParams.get('id');
        if (prodId) {
            return prodId
        }
    }    

    const [onlyOneId, setOnlyOneId] = useState(parseIdFromUrl(searchParams));
    


    const getSelectedProds = () => {
        const resultArray = [];
      
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('countOfProd')) {
            const id = key.replace('countOfProd', '');
            const count = parseInt(localStorage.getItem(key), 10);
            
            for (let j = 0; j < count; j++) {
              resultArray.push(parseInt(id, 10));
            }
          }
        }
        return resultArray;
    };

    useEffect(() => {
        const getProdsFormSer = () => {
          var prodIds = onlyOneId?[onlyOneId]:getSelectedProds();
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
        price: item.price,
        imgLink: item.imgLink,
      }));
      setProdData(newData);
    } else {
      console.error('Полученные данные не являются массивом');
    }
  };



  useEffect(() => {
      var summ = 0
      prodData.forEach(product => {
        summ += product.price;
      });
      var str = String(summ)
      SetSummOfChecked(str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.'))
    }, [prodData]);


    return(
        <div id='Order'>
            <Button id="orderBack" variant='contained'>🠈 Назад</Button>
            <div id="order">

                <h1 style={{ color: theme.palette.text.primary}}>Оформление заказа</h1>

                <div id="orderUserData" style={{ background: theme.palette.background.paper}}>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            expandIcon={<>{(user.address)?"Изменить адрес":<p style={{color: theme.palette.error.main}}>Добавить адрес</p>}<ArrowDropDown/></>}
                            style={{color: theme.palette.primary.main}}
                        >
                            <Typography color={theme.palette.text.primary}>{address?address:user.address}</Typography>
                        </AccordionSummary>
                        {user.firstname &&
                        <AccordionDetails className='AccordionDetailsSA'>
                          <SelectAddress returnAddress={setAddress} defaultAddress={user.address}/>
                          <label id="saveAdress">
                            <Checkbox 
                              checked={saveAddress}
                              onChange={(e)=>{setSaveAddress(e.target.checked)}}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography>Сохранить адрес</Typography>
                          </label>
                        </AccordionDetails>
                        }
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            expandIcon={<ArrowDropDown/>}
                            style={{color: theme.palette.primary.main}}
                        >
                            <Typography color={theme.palette.text.primary}>{user.firstname+" "+user.lastname+" "+user.email}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div id="orderProducts" style={{ background: theme.palette.background.paper}}>
                    <h2 style={{ color: theme.palette.text.primary}}>Ожадаемая дата доставки 13 декабря</h2>
                    <div id="orderProductsWrapper">
                        {prodData.map(product => (
                            <OrderProduct
                                key={product.uniqueKey}
                                id={product.id}
                                price={product.price}
                                imgLink={product.imgLink}
                            />
                        ))}
                    </div>
                </div>

                <div id="orderData" style={{ color: theme.palette.text.primary, background: theme.palette.background.paper }}>
                    <h2>Ваш заказ</h2>
                    <div className='orderDataItems' id="orderDataProducts">
                        <p>Товары ({prodData.length})</p>
                        <p>{summOfChecked}.000 <sub>₽</sub></p>
                    </div>
                    <div className='orderDataItems' id="orderDataSale">
                        <p>Скидка</p>
                        <p>-0 <sub>₽</sub></p>
                    </div>
                    <div className='orderDataItems' id="orderDataDeliveryPrice">
                        <p>Стоимость доставки</p>
                        <p>Бесплатно</p>
                    </div>
                    <Divider/>
                    <div className='orderDataItems' id="orderDataTotalPrice">
                        <h2>Итого</h2>
                        <h2>{summOfChecked}.000 <sub>₽</sub></h2>
                    </div>
                    <Button variant='contained'>Заказать</Button>
                </div>
            </div>
        </div>
    );
};

export default Order;