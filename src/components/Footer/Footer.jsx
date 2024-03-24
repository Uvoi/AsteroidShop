import React from 'react';
import './styles.css'
import visaLogo from '../../images/visa.png'
import mastercardLogo from '../../images/mastercard.png'
import bitcoinLogo from '../../images/bitcoin.png'
import ethereumLogo from '../../images/ethereum.png'
import qiwiLogo from '../../images/qiwi.png'
import paypalLogo from '../../images/paypal.png'
import telegramLogo from '../../images/telegram.png'
import vkLogo from '../../images/vk.png'
import githubLogo from '../../images/github.svg'
import { Button } from '@mui/material';

const Footer = (props)=>
{
    return(
        <footer id='Footer'>

            <ul id="payingF">
                <li><img src={visaLogo} alt=""/></li>
                <li><img src={mastercardLogo} alt=""/></li>
                <li><img src={bitcoinLogo} alt=""/></li>
                <li><img src={ethereumLogo} alt=""/></li>
                <li><img src={qiwiLogo} alt=""/></li>
                <li><img src={paypalLogo} alt=""/></li>
            </ul>

            <h2>Контакты</h2>
            <div id="contact_aboutF">
                <div id="contactsF">
                    <div id='contactIconsF'>
                        <a href='https://vk.com/asteroid_shop_proj' target='_blank' rel='noopener noreferrer'><img src={vkLogo} alt="VK" /></a>
                        <a href='https://github.com/Uvoi/AsteroidShop' target='_blank' rel='noopener noreferrer'><img src={githubLogo} alt="GitHub" /></a>
                        <a href='https://t.me/asteroid_shop_proj' target='_blank' rel='noopener noreferrer'><img src={telegramLogo} alt="Telegram" /></a>
                    </div>
                    <p>+7 (330) 133-01-33</p>
                    <p>+7 (27) 922-41-469</p>
                    <Button variant="contained">Задать вопрос</Button>
                </div>

                <span id="aboutUsF">
                    www.baobab.cas Owned and operated by Baobab Media inc (registration number 330101), address: Ratmanov Island, Chukotka district, Lenin Street 101 with a registered office located at Bolshoy Lyakhovsky Island, Bulunsky Ulus Municipal District, Republic of Sakha (Yakutia).  The terms and conditions in the part that relates to your participation in the Games are governed by the laws of Atlantis, and in the part that relates to the collection of payments and transactions are governed by the laws of Asia and Oceania, respectively. You acknowledge that, unless otherwise stated, the Games are organized in Atlantis and your participation in these Games takes place in the aforementioned territory. Any contractual relationship between you and us is considered concluded and executed by the parties in Atlantis, at the registered address. The Parties agree that any dispute, contradiction or claim arising out of or in connection with these Terms and Conditions, as well as their violation, termination or invalidity, are subject to the exclusive jurisdiction of the courts of Atlantis, with the exception of claims arising from payment transactions, which must be referred to the courts of Eastasia. or Oceania.
                </span>
            </div>

            <span id="rights">© Baobab, 1988-2024. Все права защищены. </span>
        
        </footer>
    );
};

export default Footer;