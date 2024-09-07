import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import ListPreview from '../../components/ListPreview/ListPreview';
import { themeContext } from '../../App';
import { getAllUsers } from '../../functions/user';
import { getAllOrders } from '../../functions/order';
import StatisticsBlock from '../../components/ListPreview/StatisticsBlock/StatisticsBlock';
import { getStats } from '../../functions/statistics';

const Admin = () => {
    const theme = useContext(themeContext);

    const [users, setUsers] = useState([]);
    const [totalCountUsers, setTotalCountUsers] = useState(0);
    const [orders, setOrders] = useState([]);
    const [totalCountOrders, setTotalCountOrders] = useState(0);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const parseUsers = async () => {
            const gettedUsers = await getAllUsers(0, 5);
            setUsers(gettedUsers.users);
            setTotalCountUsers(gettedUsers.total_count);
        };

        const parseOrders = async () => {
            const gettedOrders = await getAllOrders(0, 5);
            setOrders(gettedOrders.orders);
            setTotalCountOrders(gettedOrders.total_count);
        };
        const parseStats = async () => {
            const gettedStats = await getStats();
            const formattedStats = {
                'Суммарно заработано': `${(String(gettedStats.total_earnings)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.')}.000 ₽`,  // Добавляем валюту
                'Продуктов в доставке': gettedStats.products_in_transit,
                'Доставленных продуктов': gettedStats.delivered_products,
                'Всего пользователей': gettedStats.total_users,
                'Всего заказов': gettedStats.total_orders
            };
            setStats(formattedStats);
        };
        
        parseUsers();
        parseOrders();
        parseStats();
    }, []);

    return (
        <div id='Admin'>
            <div className='adminBox'>
                <StatisticsBlock data={stats} title={'Статистика'}/>
                <ListPreview title={'Заказы'} data={orders} totalCount={totalCountOrders} col1={'orderid'} col2={'customerid'} col3={'orderdate'} col4={'status'} link={'/admin/orders'}/>
            </div>
            <div className='adminBox'>
                <ListPreview title={'Пользователи'} data={users} totalCount={totalCountUsers} col1={'customerid'} col2={'firstname'} col3={'lastname'} col4={'email'} link={'/admin/users'}/>
            </div>
        </div>
    );
};

export default Admin;
