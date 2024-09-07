import React, { useState, useEffect, useContext } from 'react';
import { Skeleton, TextField } from '@mui/material';

import "./styles.css";
import { themeContext } from '../../App';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderItem from '../../components/OrderItem/OrderItem';
import {getUserData, isUserAdmin} from '../../functions/user';
import { getOrders } from '../../functions/order';
import { useNavigate, useSearchParams } from 'react-router-dom';

const User = ({props})=>
{
    const theme = useContext(themeContext)

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [orders, setOrders] = useState([]);
    const [updateOrders, setUpdateOrders] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const parseIdFromUrl = (urlParams) => {
        const userId = urlParams.get('id');
        if (userId) {
            return userId
        }
    }    
    const [idFromUrl, setIdFromUrl] = useState(parseIdFromUrl(searchParams));

    const navigate = useNavigate()
    useEffect(() => {
      if (!idFromUrl)
      {
        navigate('/')
      }
    }, [idFromUrl])


    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await getUserData(idFromUrl);
            if (fetchedUser) {
                setUserFirstName(fetchedUser.firstname);
                setUserLastName(fetchedUser.lastname);
                setUserPhoto(fetchedUser.photo);
                setUserEmail(fetchedUser.email);
                setUserAddress(fetchedUser.address);
            }
        }
    
        fetchUserData();
    }, []);
    

    useEffect(() => {
        async function fetchOrders() {
            const fetchedOrders = await getOrders(idFromUrl);
            setOrders(fetchedOrders);
        }
        fetchOrders();
    }, [updateOrders]);

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

    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkAdmin = async () => {
            const isAdminValue = await isUserAdmin();
            setIsAdmin(isAdminValue);
        }
    
        checkAdmin();
    }, []);

    return (
        <div id='Profile_wrapper'>
            <div id="Profile" className='profilePaper' style={{ background: theme.palette.background.paper}}>
                    {loading && (
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    )}
                    <div id='photoProf'>
                        <img
                        onLoad={handleImageLoad}
                        onError={() => setLoading(false)}
                        style={{ display: loading ? 'none' : 'block' }}
                        src={userPhoto?userPhoto:"https://masterpiecer-images.s3.yandex.net/5028da4f87c611ee809a3a7ca4cc1bdc:upscaled"} 
                        alt="🖼️" />
                    </div>
                <div id="dataProf">
                    <div id="inputsProf">
                        { isAdmin&&
                        <TextField
                            readOnly 
                            label="Электронная почта" 
                            variant="standard" 
                            value={userEmail ? userEmail : "" }/>
                        }
                        <TextField
                            readOnly={!isAdmin}
                            type='text' 
                            label="Имя" 
                            variant="standard" 
                            value={userFirstName ? userFirstName : ""}/>
                        <TextField      
                            readOnly={!isAdmin}
                            type="text"
                            label="Фамилия" 
                            variant="standard" 
                            value={userLastName ? userLastName : ""}/>
                            { isAdmin&&
                            <TextField
                            readOnly 
                            label="Адрес" 
                            variant="standard" 
                            value={userAddress ? userAddress : "" }/>
                            }
                    </div>
                </div>
            </div>
            {isAdmin&&
            <div id='ordersProf' className="profilePaper"  style={{ background: theme.palette.background.paper}}>
                <h2 style={{color: theme.palette.text.ultra}}>Заказы</h2>
                <div id="ordersContainerProf">
                    <OrdersList>
            {orders.map((order, index) => (
                <OrderItem
                    key={order.orderid}
                    id = {order.orderid}
                    productIds={order.productids}
                    totalPrice={order.totalprice}
                    orderDate={order.orderdate}
                    DeliveryAddress={order.deliveryaddress}
                    deliveryDate={order.deliverydate}
                    orderStatus={translateStatus(order.status)}
                    updateOrders={()=>setUpdateOrders(!updateOrders)}
                />
            ))}
        </OrdersList>
                </div>
            </div>
            }
        </div>
    );
};

export default User;