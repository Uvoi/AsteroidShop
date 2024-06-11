import React from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import { useNotification } from '../../components/Notification/Notification';
import BasketProduct from '../../components/BasketProduct/BasketProduct';
import pass from '../../images/pass.jpg'

const Basket = ({theme}) => {
    const showNotification = useNotification();

    return (
        <div id='Basket' style={{backgroundColor: theme.palette.background.paper}}>
            <div id="basket">
                <BasketProduct theme={theme} prdtDiameter={16.4} prdtTitle="testTitle" prdtDescription="dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba dJHDsadajsda dadbkadba dJHDsadajsda dadbkadba dJHDsadajsda dadbkadba d kbad ka dJHDsadajsda dadbkadba d kbad ka" prdtWeight={100} prdtCategory="Каменный" prdtPrice={500} imgLink={pass}/>   
                <BasketProduct theme={theme} prdtDiameter={16.4} prdtTitle="testTitle" prdtDescription="dJHDsadajsda dadbkadba d kbad ka" prdtWeight={100} prdtCategory="Каменный" prdtPrice={500} imgLink={pass}/>   
                <BasketProduct theme={theme} prdtDiameter={16.4} prdtTitle="testTitle" prdtDescription="dJHDsadajsda dadbkadba d kbad ka" prdtWeight={100} prdtCategory="Каменный" prdtPrice={500} imgLink={pass}/>   
                <BasketProduct theme={theme} prdtDiameter={16.4} prdtTitle="testTitle" prdtDescription="dJHDsadajsda dadbkadba d kbad ka" prdtWeight={100} prdtCategory="Каменный" prdtPrice={500} imgLink={pass}/>   
            </div>
        </div>
    );
};

export default Basket;
