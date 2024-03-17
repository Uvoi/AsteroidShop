import React from 'react';
import './styles.css'
import logo from './../../images/logo.svg'
import user from './../../images/user.svg'
import basket from './../../images/basket.svg'




const Header = (props)=>
{
    return(
        <div id='Header'>
            <div id="header">
                <div id="LogoH"><img src={logo} alt="" /></div>
                <div id='MenuH' className='text_stroke'>
                    <ul>
                        <li id='MainPageH'><a href='#'>Главная</a></li>
                        <li id='CatalogPageH'><a href='catalog'>Каталог</a></li>
                        <li id='AboutPageH'><a href='#'>О нас</a></li>
                        <li id='ContactPageH'><a href='#'>Помощь</a></li>
                    </ul>
                </div>
                <div id="Basket_UserDataH">
                    <a id='BasketH' href=""><img src={basket} alt="" /></a>
                    <div id="UserDataH">
                        <div>
                            <a href='' className='bot_line'>baobab</a>
                            <a href='' className='bot_line'>500</a>
                        </div>
                        <a href=""><img src={user} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;


