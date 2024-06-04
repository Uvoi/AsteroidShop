import React from 'react';
import './styles.css'
import logo from './../../images/logo.svg'
import user from './../../images/user.svg'
import basket from './../../images/basket.svg'




const Header = ({onToggleTheme})=>
{

    return(
        <div id='Header'>
            <div id="header">
                <div id="LogoH"><button onClick={onToggleTheme}><img src={logo} alt="" /></button></div>
                <div id='MenuH' className='text_stroke'>
                    <ul>
                        <li id='MainPageH'><a href='/'>Главная</a></li>
                        <li id='CatalogPageH'><a href='/catalog'>Каталог</a></li>
                        <li id='AboutPageH'><a href='/about'>О нас</a></li>
                        <li id='ContactPageH'><a href='/help'>Помощь</a></li>
                    </ul>
                </div>
                <div id="Basket_UserDataH">
                    <a id='BasketH' href=""><img src={basket} alt="" /></a>
                    <div id="UserDataH">
                        <a href='' className='bot_line'>baobab</a>
                        <a href=""><img src={user} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;


