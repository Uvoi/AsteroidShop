import axios from "axios";

export async function getOrders() {
    try {
        const response = await axios.get('http://localhost:8000/api/order/', { withCredentials: true });
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

export async function canelOrder(orderid) {
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