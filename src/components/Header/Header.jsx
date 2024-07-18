import React, { useContext, useState } from 'react';
import './styles.css'
import logo from './../../images/logo.svg'
import userLogo from './../../images/userImg.png'
import basket from './../../images/basket.svg'
import StarButton from '../StarButton/StarButton';
import { Backdrop, Modal} from '@mui/material';
import RegLogM from '../RegLogM/RegLogM';
import axios from 'axios';
import { themeContext } from '../../App';




const Header = ({onToggleTheme, user, updateUser})=>
{
    const theme = useContext(themeContext)
    const [regOrLog, setRegOrLog] = useState(true);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteSess = () =>
        {
            axios.post('http://localhost:8000/api/session/delete', {
            }, { withCredentials: true })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

    return(
        <div id='Header' style={{background: theme.palette.header.primary}}>
            <div id="header">
                <div id="LogoH"><button onClick={onToggleTheme}><img src={logo} alt="" /></button></div>
                <div id='MenuH' className='text_stroke'>
                    <ul>
                        <li ><StarButton href="/">Главная</StarButton></li>
                        <li ><StarButton href="/catalog">Каталог</StarButton></li>
                        <li ><StarButton href="/about">О нас</StarButton></li>
                        <li ><StarButton href="/help">Помощь</StarButton></li>
                        
                    </ul>
                </div>
                <div id="Basket_UserDataH">
                    <a id='BasketH' href="/basket"><img src={basket} alt="" /></a>
                    {user!=null?
                    <div id="UserDataH">
                        <a href='/profile' className='bot_line'>{user.firstname}</a>
                        <a href="/profile"><img src={userLogo} alt="" /></a>
                        <button onClick={deleteSess}>del</button>
                    </div>
                    : 
                    <div id="UserLogReg">
                        <button className='bot_line' onClick={()=>{handleOpen(); setRegOrLog(false)}}>Вход</button>
                        <p>/</p>
                        <button className='bot_line' onClick={()=>{handleOpen(); setRegOrLog(true)}}>Регистрация</button>
                    </div>
                    }

                    <Modal
                    open={open}
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


