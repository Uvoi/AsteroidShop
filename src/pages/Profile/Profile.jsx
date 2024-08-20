import React, { useState, useEffect, useContext } from 'react';
import "./styles.css";
import axios from 'axios';
import { useNotification } from '../../components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { themeContext, userContext } from '../../App';
import { Backdrop, Button, Input, Modal, TextField } from '@mui/material';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderItem from '../../components/OrderItem/OrderItem';
import {changeAddress, changeFullName, changePhoto} from '../../functions/user';
import SelectAddress from '../../components/SelectAddress/SelectAddress';
import { getOrders } from '../../functions/order';

const Profile = ({updateUser})=>
{
    const theme = useContext(themeContext)
    const user = useContext(userContext)
    const navigate = useNavigate();

    const showNotification = useNotification();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [orders, setOrders] = useState([]);
    const [isChangePhoto, setIsChangePhoto] = useState(false);
    const [userPhoto, setUserPhoto] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            const fetchedOrders = await getOrders();
            setOrders(fetchedOrders);
        }
        
        fetchOrders();
    }, []);

    useEffect(() => {
        setUserFirstName(user.firstname);
        setUserLastName(user.lastname);
    }, [user.email]);

    const handleSaveClick = async () => {
        if (!isValidFullName(userFirstName) === false && !isValidFullName(userLastName) === false){
            if (user.firstname !== userFirstName || user.lastname !== userLastName || (user.address !== userAddress && userAddress !== undefined)){
                if (user.firstname !== userFirstName || user.lastname !== userLastName)
                    {
                        if (await changeFullName(userFirstName, userLastName))
                            {
                                console.log('Имя обновлено успешно');
                                updateUser()
                                showNotification('Имя успешно обновлено', theme.palette.success.ultra);
                            }
                    }
                if (user.address !== userAddress && userAddress !== undefined)
                    {
                        if (await changeAddress(userAddress))
                            {
                                console.log('Адрес обновлен успешно');
                                showNotification('Адрес успешно обновлен', theme.palette.success.ultra);
                            }
                    }
            }
            else showNotification('Нет изменений', theme.palette.error.ultra);
        }
        else showNotification('Поля имени должны быть от 4 до 20 символов и включать только буквы и цифры', theme.palette.error.ultra, 10000);
    };

    const isValidFullName = (name) => {
        return /^[a-zA-Z0-9\s]{4,20}$/.test(name);
    };

    const unlogin = () => {
        axios.post('http://localhost:8000/api/session/delete', {
        }, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        updateUser()
        navigate('/');
    }

    const translateStatus = (status) =>
    {
        switch (status) {
            case 'Completed':
                return 'Завершен';
            case 'In Transit':
                return 'В доставке';
            case 'Cancelled':
                return 'Отменен';
            default:
                return 'Ошибка';
        }
    }

    const handleSavePhotoClick = () =>
    {
        if (changePhoto(userPhoto))
        {
            showNotification('Фото успешно обновлено', theme.palette.success.ultra);
            setIsChangePhoto(false)
            updateUser()
        }
    }

    return (
        <div id='Profile_wrapper'>
            <div id="Profile" className='profilePaper' style={{ background: theme.palette.background.paper}}>
                <button id='photoProf' onClick={()=>setIsChangePhoto(true)}><img src={user.photo?user.photo:"https://masterpiecer-images.s3.yandex.net/5028da4f87c611ee809a3a7ca4cc1bdc:upscaled"} alt="🖼️" />
                    <span style={{color: theme.palette.background.default}}>Изменить фото</span>
                </button>
                <div id="dataProf">
                    <div id="inputsProf">
                        <TextField
                            readOnly 
                            label="Электронная почта" 
                            variant="standard" 
                            value={user.email ? user.email : "" }/>
                        <TextField
                            error={!isValidFullName(userFirstName)}
                            type='text' 
                            label="Имя" 
                            variant="standard" 
                            value={userFirstName ? userFirstName : ""}
                            onChange={(e) => setUserFirstName(e.target.value)}/>
                        <TextField      
                            error={!isValidFullName(userLastName)}
                            type="text"
                            label="Фамилия" 
                            variant="standard" 
                            value={userLastName ? userLastName : ""}
                            onChange={(e) => setUserLastName(e.target.value)}/>
                        <SelectAddress returnAddress={setUserAddress} defaultAddress={user.address}/>
                    </div>
                <div id="save_exitProf">
                    <Button variant='contained' color='error' onClick={unlogin}>Выйти</Button>
                    <Button variant='contained' onClick={handleSaveClick}>Сохранить</Button> 
                    
                </div>
                </div>
            </div>
            <div id='ordersProf' className="profilePaper"  style={{ background: theme.palette.background.paper}}>
                <h2 style={{color: theme.palette.text.ultra}}>Мои заказы</h2>
                <div id="ordersContainerProf">
                    <OrdersList>
            {orders.map((order, index) => (
                <OrderItem
                    key={index}
                    productIds={order.productids}
                    totalPrice={order.totalprice}
                    orderDate={order.orderdate}
                    DeliveryAddress={order.deliveryaddress}
                    deliveryDate={order.deliverydate}
                    orderStatus={translateStatus(order.orderstatus)}
                />
            ))}
        </OrdersList>
                </div>
            </div>

            <Modal
                open={isChangePhoto}
                onClose={()=>setIsChangePhoto(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                    timeout: 1000,
                    },
                }}
                >  
                <div id="changeUserPhotoMP">
                    <Input 
                    type="text" 
                    placeholder='Ссылка на ваше фото' 
                    value={userPhoto}
                    onChange={(e)=>setUserPhoto(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleSavePhotoClick}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;