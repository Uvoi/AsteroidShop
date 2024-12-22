import React, { useEffect, useState } from 'react';
import './styles.css';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import OrderProduct from '../OrderProduct/OrderProduct';
import ConfirmM from '../ConfirmM/ConfirmM';
import { cancelOrder, deleteOrder } from '../../functions/order';
import { useTheme } from '../../themes/ThemeProvider';
import OrderProductsContainer from '../OrderProduct/OrderProductsContainer/OrderProductsContainer';

interface OrderItemProps {
  id: number;
  productIds: number[];
  totalPrice: number;
  orderDate: string;
  DeliveryAddress: string;
  deliveryDate: string;
  orderStatus: string;
  updateOrders: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  productIds,
  totalPrice,
  orderDate,
  DeliveryAddress,
  deliveryDate,
  orderStatus,
  updateOrders,
}) => {
  const { theme } = useTheme();
  const statusColor =
    orderStatus === 'В доставке'
      ? theme.palette.success.main
      : orderStatus === 'Отменен'
      ? theme.palette.error.main
      : theme.palette.text.secondary;

  const [expanded, setExpanded] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  useEffect(() => {
    if (confirmCancel) {
      cancelOrder(id);
      updateOrders();
    }
  }, [confirmCancel]);

  useEffect(() => {
    if (confirmDelete) {
      deleteOrder(id);
      updateOrders();
    }
  }, [confirmDelete]);

  return (
    <div className="OrderItem" style={{ background: theme.palette.background.paper2 }}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        slotProps={{ transition: { unmountOnExit: true } }}
      >
        <AccordionSummary
          className="orderItemHeader"
          aria-controls="panel1a-content"
          style={{ color: theme.palette.text.primary }}
        >
          <h3>
            Заказ от {orderDate} ({productIds.length})
          </h3>
          <div>
            <h4>{String(totalPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.')}.000 ₽</h4>
            <h4 style={{ color: statusColor }}>
              {orderStatus === 'В доставке' && expanded ? (
                <Button
                  variant="contained"
                  style={{ background: theme.palette.error.main }}
                  onClick={() => setConfirmCancelModal(true)}
                >
                  Отменить
                </Button>
              ) : (orderStatus === 'Отменен' || orderStatus === 'Завершен') && expanded ? (
                <Button
                  variant="contained"
                  style={{ background: theme.palette.error.main }}
                  onClick={() => setConfirmDeleteModal(true)}
                >
                  Удалить
                </Button>
              ) : (
                orderStatus
              )}
            </h4>
          </div>
        </AccordionSummary>
        <AccordionDetails className="orderItemData">
          <OrderProductsContainer>
            {productIds.map((product, index) => (
              <OrderProduct
                // key={`${product}-${index}`}
                id={product}
                nonPrice
              />
            ))}
          </OrderProductsContainer>
          <div className="orderItemDeliveryData">
            <h4 className="delAddressOI">{DeliveryAddress}</h4>
            <h4 className="delDateOI">Дата доставки: {deliveryDate}</h4>
          </div>
        </AccordionDetails>
      </Accordion>
      <ConfirmM
        open={confirmCancelModal}
        close={() => setConfirmCancelModal(false)}
        no="Нет"
        message={`Отменить доставку ${productIds.length} товаров(а) на сумму ${totalPrice}.000 ₽ ?`}
        getResult={(res) => setConfirmCancel(res)}
      />
      <ConfirmM
        open={confirmDeleteModal}
        close={() => setConfirmDeleteModal(false)}
        no="Нет"
        message={`Удалить заказ на сумму ${totalPrice}.000 ₽ ?`}
        getResult={(res) => setConfirmDelete(res)}
      />
    </div>
  );
};

export default OrderItem;
