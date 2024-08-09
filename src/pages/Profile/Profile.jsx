import React, { useState, useEffect, useContext } from 'react';
import "./styles.css";
import axios from 'axios';
import { useNotification } from '../../components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { themeContext, userContext } from '../../App';
import { Button, TextField } from '@mui/material';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderItem from '../../components/OrderItem/OrderItem';
import {changeAddress, changeFullName} from '../../functions/user';
import SelectAddress from '../../components/SelectAddress/SelectAddress';

const Profile = ({updateUser})=>
{
    const theme = useContext(themeContext)
    const user = useContext(userContext)
    const navigate = useNavigate();

    const showNotification = useNotification();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userAddress, setUserAddress] = useState('');

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

    return (
        <div id='Profile_wrapper'>
            <div id="Profile" className='profilePaper' style={{ background: theme.palette.background.paper}}>
                <button id='photoProf'><img src={user.photo?user.photo:"https://masterpiecer-images.s3.yandex.net/5028da4f87c611ee809a3a7ca4cc1bdc:upscaled"} alt="🖼️" />
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
                        <OrderItem productIds={[37,2,35]} totalPrice='2.100' orderDate='12.09.2024' DeliveryAddress='Калуга' deliveryDate='15.09.2024' orderStatus='В доставке' />
                        <OrderItem productIds={[37,2,35,5,16,2,2,2,2,2]} totalPrice='3.250' orderDate='12.09.2024' DeliveryAddress='Калуга' deliveryDate='15.09.2024' orderStatus='Отменен' />
                        <OrderItem productIds={[1,2]} totalPrice='1.500' orderDate='12.09.2024' DeliveryAddress='Калуга' deliveryDate='15.09.2024' orderStatus='Завершен' />
                        <OrderItem productIds={[37]} totalPrice='400' orderDate='12.09.2024' DeliveryAddress='Калуга' deliveryDate='15.09.2024' orderStatus='Завершен' />
                    </OrdersList>
                </div>
            </div>
        </div>
    );
};

export default Profile;