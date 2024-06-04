import React from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import { useNotification } from '../../components/Notification/Notification';

const Basket = ({ items = [], onRemove, onUpdateQuantity, onCheckout }) => {
    const showNotification = useNotification();

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity < 1) {
            showNotification("Количество не может быть меньше 1", "red");
            return;
        }
        onUpdateQuantity(id, quantity);
    };

    const getTotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <div id='Basket'>
            <h1>Корзина покупок</h1>
            {items.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <div className="basket-container">
                    <table className="basket-table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Количество</th>
                                <th>Цена за единицу</th>
                                <th>Всего</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{item.price.toFixed(2)} руб.</td>
                                    <td>{(item.price * item.quantity).toFixed(2)} руб.</td>
                                    <td>
                                        <Button variant="contained" onClick={() => onRemove(item.id)} color="secondary">
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="basket-summary">
                        <h2>Итого: {getTotal().toFixed(2)} руб.</h2>
                        <div className="basket-actions">
                            <Button variant="contained" onClick={onCheckout} color="primary">
                                Оформить заказ
                            </Button>
                            <Button variant="contained" onClick={() => window.history.back()} color="default">
                                Продолжить покупки
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Basket;
