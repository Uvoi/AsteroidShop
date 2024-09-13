import axios from "axios";

export async function getOrders(id=-1) {
    try {
        const response = await axios.get('http://localhost:8000/api/order/', { 
            withCredentials: true,
            params: { 
                id: id, 
            },
        });
        return response.data.orders || [];
    } catch (error) {
        console.log('Error fetching orders: ', error);
        return [];
    }
}

export async function addOrder(productIds, deliveryAddress) {
    try {
        const response = await axios.post('http://localhost:8000/api/order/add', {
            productids: productIds,
            deliveryaddress: deliveryAddress
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error('Error adding order: ', error);
        throw error;
    }
}

export async function cancelOrder(orderid) {
    try {
        const response = await axios.patch('http://localhost:8000/api/order/cancel', {
            orderid: orderid
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error('Error canceling order: ', error);
        throw error;
    }
}

export async function deleteOrder(orderid) {
    try {
        const response = await axios.patch('http://localhost:8000/api/order/delete', {
            orderid: orderid
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error('Error deleting order: ', error);
        throw error;
    }
}

export async function getAllOrders(start, count) {
    try {
        const response = await axios.get('http://localhost:8000/api/admin/orders', {
            params: { 
                start: start, 
                count: count 
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        return false;
    }
}

export const translateStatus = (status) =>
    {
        switch (status) {
            case 'Completed':
                return 'Завершен';
            case 'In Transit':
                return 'В доставке';
            case 'Cancelled':
                return 'Отменен';
            case 'Deleted':
                return 'Удален';
            default:
                return 'Ошибка';
        }
    }