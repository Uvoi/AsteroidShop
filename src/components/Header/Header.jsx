import React from 'react';
import './styles.css'
import logo from './../../images/logo.svg'
import user from './../../images/userImg.png'
import basket from './../../images/basket.svg'
import StarButton from '../StarButton/StarButton';




const Header = ({onToggleTheme, theme})=>
{

    return(
        <div id='Header' style={{background: theme.palette.header.primary}}>
            <div id="header">
                <div id="LogoH"><button onClick={onToggleTheme}><img src={logo} alt="" /></button></div>
                <div id='MenuH' className='text_stroke'>
                    <ul>
                        <li ><StarButton href="/" theme={theme}>Главная</StarButton></li>
                        <li ><StarButton href="/catalog" theme={theme}>Каталог</StarButton></li>
                        <li ><StarButton href="/about" theme={theme}>О нас</StarButton></li>
                        <li ><StarButton href="/help" theme={theme}>Помощь</StarButton></li>
                        
                    </ul>
                </div>
                <div id="Basket_UserDataH">
                    <a id='BasketH' href="/basket"><img src={basket} alt="" /></a>
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


