import React, { useContext, useState } from 'react';
import './styles.css'
import logo from './../../images/logo.webp'
import userLogo from './../../images/userImg.webp'
import { ReactComponent as BasketSvg } from './../../images/basket.svg'
import StarButton from '../StarButton/StarButton';
import { Backdrop, Modal} from '@mui/material';
import RegLogM from '../RegLogM/RegLogM';
import { themeContext, userContext } from '../../App';
import { Link } from 'react-router-dom';




const Header = ({onToggleTheme, updateUser, openRegLogModal, setOpenRegLogModal})=>
{
    const theme = useContext(themeContext)
    const user = useContext(userContext)
    const [regOrLog, setRegOrLog] = useState(true);
    const [rotate, setRotate] = useState(false);

    const handleOpen = () => setOpenRegLogModal(true);
    const handleClose = () => setOpenRegLogModal(false);

    const handleLogoClick = () =>
        {
            onToggleTheme()
            setRotate(!rotate)
        }

    return(
        <div id='Header' style={{background: theme.palette.header.primary}}>
            <div id="header">
                <div id="LogoH"><button onClick={handleLogoClick}><img className={rotate?'rotate':'unrotate'} src={logo} alt="" /></button></div>
                <div id='MenuH' className='text_stroke'>
                    <ul>
                        <li ><StarButton to="/">Главная</StarButton></li>
                        <li ><StarButton to="/catalog">Каталог</StarButton></li>
                        <li ><StarButton to="/about">О нас</StarButton></li>
                        <li ><StarButton to="/help">Помощь</StarButton></li>
                    </ul>
                </div>
                <div id="Basket_UserDataH">
                    <Link id='BasketH' to="/basket">
                        <BasketSvg/>
                    </Link>
                    {user!=null?
                    <div id="UserDataH">
                        <Link to='/profile' className='bot_line'>{user.firstname}</Link>
                        <Link to="/profile"><img src={user.photo?user.photo:userLogo} alt="" /></Link>
                    </div>
                    : 
                    <div id="UserLogReg">
                        <button className='bot_line' onClick={()=>{handleOpen(); setRegOrLog(false)}}>Вход</button>
                        <p>/</p>
                        <button className='bot_line' onClick={()=>{handleOpen(); setRegOrLog(true)}}>Регистрация</button>
                    </div>
                    }

                    <Modal
                    open={openRegLogModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 1000,
                      },
                    }}
                    >  
                        <RegLogM action={regOrLog} close={handleClose} updateUser={updateUser}/>    
                    </Modal>
                    
                </div>
            </div>
        </div>
    );
};

export default Header;


