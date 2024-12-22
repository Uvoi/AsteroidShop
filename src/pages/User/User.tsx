import React, { useState, useEffect } from 'react';
import { Skeleton, TextField } from '@mui/material';

import "./styles.css";
import OrdersList from '../../components/OrdersList/OrdersList';
import OrderItem from '../../components/OrderItem/OrderItem';
import { deleteUser, getUserData, isUserAdmin } from '../../functions/user';
import { getOrders, translateStatus } from '../../functions/order';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import Empty from '../Empty/Empty';
import { useTheme } from '../../themes/ThemeProvider';

interface User {
  firstname: string;
  lastname: string;
  photo: string;
  email: string;
  address: string;
}

interface Order {
  orderid: number;
  productids: number[];
  totalprice: number;
  orderdate: string;
  deliveryaddress: string;
  deliverydate: string;
  status: string;
}

const User: React.FC = () => {
  const { theme } = useTheme();

  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [updateOrders, setUpdateOrders] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const parseIdFromUrl = (urlParams: URLSearchParams): number | null => {
    const userId = urlParams.get('id');
    return userId ? parseInt(userId, 10) : null;
  };

  const [idFromUrl, setIdFromUrl] = useState<number | null>(parseIdFromUrl(searchParams));

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      if (idFromUrl !== null) {
        const fetchedUser: User | null = await getUserData(idFromUrl);
        if (fetchedUser) {
          setUserFirstName(fetchedUser.firstname);
          setUserLastName(fetchedUser.lastname);
          setUserPhoto(fetchedUser.photo);
          setUserEmail(fetchedUser.email);
          setUserAddress(fetchedUser.address);
        }
      } else {
        navigate('/');
      }
    }
    fetchUserData();
  }, [idFromUrl, navigate]);

  useEffect(() => {
    async function fetchOrders() {
      if (idFromUrl !== null) {
        const fetchedOrders: Order[] = await getOrders(idFromUrl);
        setOrders(fetchedOrders);
      }
    }
    fetchOrders();
  }, [idFromUrl, updateOrders]);

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
    };

    checkAdmin();
  }, []);

  return (
    <>
      {userFirstName && userLastName ? (
        <div id='Profile_wrapper'>
          <div
            id="Profile"
            className='profilePaper'
            style={{ background: theme.palette.background.paper }}
          >
            {loading && (
              <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            )}
            <div id='photoProf'>
              <img
                onLoad={handleImageLoad}
                onError={() => setLoading(false)}
                style={{ display: loading ? 'none' : 'block' }}
                src={
                  userPhoto
                    ? userPhoto
                    : "https://masterpiecer-images.s3.yandex.net/5028da4f87c611ee809a3a7ca4cc1bdc:upscaled"
                }
                alt="🖼️"
              />
            </div>
            <div id="dataProf">
              <div id="inputsProf">
                {isAdmin && (
                  <TextField
                    inputProps={{ readOnly: true }}
                    label="Электронная почта"
                    variant="standard"
                    value={userEmail || ""}
                  />
                )}
                <TextField
                  inputProps={{ readOnly: !isAdmin }}
                  type='text'
                  label="Имя"
                  variant="standard"
                  value={userFirstName || ""}
                />
                <TextField
                  inputProps={{ readOnly: !isAdmin }}
                  type="text"
                  label="Фамилия"
                  variant="standard"
                  value={userLastName || ""}
                />
                {isAdmin && (
                  <TextField
                    inputProps={{ readOnly: true }}
                    label="Адрес"
                    variant="standard"
                    value={userAddress || ""}
                  />
                )}
              </div>
            </div>
          </div>
          {isAdmin && (
            <>
              <div
                id='ordersProf'
                className="profilePaper"
                style={{ background: theme.palette.background.paper }}
              >
                <h2 style={{ color: theme.palette.text.ultra }}>Заказы</h2>
                <div id="ordersContainerProf">
                  <OrdersList>
                    {orders.map((order) => (
                      <OrderItem
                        key={order.orderid}
                        id={order.orderid}
                        productIds={order.productids}
                        totalPrice={order.totalprice}
                        orderDate={order.orderdate}
                        DeliveryAddress={order.deliveryaddress}
                        deliveryDate={order.deliverydate}
                        orderStatus={translateStatus(order.status)}
                        updateOrders={() => setUpdateOrders(!updateOrders)}
                      />
                    ))}
                  </OrdersList>
                </div>
              </div>
              <AdminPanel
                remove={() => deleteUser(idFromUrl!)}
                removeTitle={'Удалить пользователя'}
              />
            </>
          )}
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default User;
