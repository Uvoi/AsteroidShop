import React, { forwardRef, useContext, useState } from 'react';
import './styles.css';
import { motion, useAnimation } from 'framer-motion';
import { Button, Switch, TextField } from '@mui/material';
import { useNotification } from '../Notification/Notification';
import { themeContext } from '../../App';
import { sendLSBasketToServ } from '../../functions/basket';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../functions/user';

const RegLogM = forwardRef(({ action, close = null, updateUser, goto = null }, ref) => {
    const theme = useContext(themeContext);
    const [regOrLog, setRegOrLog] = useState(action);
    const [switcher, setSwitcher] = useState(action);
    const [nameInput, setNameInput] = useState("");
    const [fullNameInput, setFullNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [logErr, setLogErr] = useState([false, false]);
    const [regErr, setRegErr] = useState(false);
    const showNotification = useNotification();
    const navigate = useNavigate();

    const controlsLog = useAnimation();
    const controlsReg = useAnimation();

    const switchLtoR = async () => {
        await controlsLog.start({
            x: '-30vw',
            transition: { duration: 0.15 },
        });
        controlsLog.set({ display: 'none' });
        setRegOrLog(!regOrLog);

        controlsReg.start({
            x: ['30vw', 0],
            display: 'flex',
            transition: { duration: 0.25 },
        });
    };

    const switchRtoL = async () => {
        await controlsReg.start({
            x: '30vw',
            transition: { duration: 0.15 },
        });
        controlsReg.set({ display: 'none' });
        setRegOrLog(!regOrLog);

        controlsLog.start({
            x: ['-30vw', 0],
            display: 'flex',
            transition: { duration: 0.25 },
        });
    };

    const handleChange = async () => {
        switcher ? switchRtoL() : switchLtoR();
        setSwitcher(!switcher);
    };

    const sendToServ = async (e, act) => {
        e.preventDefault();
        const userData = {
          firstname: nameInput,
          lastname: fullNameInput,
          email: emailInput,
          password: passwordInput,
        };
    
        try {
          const data = await createSession(act, userData);
          console.log(data);
          if (close) close();
          updateUser();
          sendLSBasketToServ();
          showNotification('Добро пожаловать', 'green');
          navigate(goto, { replace: true });
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 469:
                setLogErr([true, false]);
                showNotification('Неверный пароль', 'red', 3500);
                break;
              case 470:
                setLogErr([false, true]);
                showNotification('Пользователя с такой почтой не существует', 'red', 3500);
                break;
              case 468:
                setRegErr(true);
                showNotification('Данная почта уже зарегистрирована', 'red', 3500);
                break;
              default:
                showNotification('Произошла ошибка', 'red', 3500);
                break;
            }
            console.log(error.response.data.detail);
          } else {
            showNotification('Ошибка соединения с сервером', 'red', 3500);
            console.error('Ошибка:', error.message);
          }
        }
      };

    
    return(
        <div ref={ref} id='RegLogM' style={{background: theme.palette.background.paper, border: '2px solid'+theme.palette.primary.main}}>
            <div id="switchRegLogM">
                <h2 style={{ color: theme.palette.text.primary }}>Вход</h2>
                <Switch
                  checked={switcher}
                  onChange={handleChange}/>
                <h2 style={{ color: theme.palette.text.primary }}>Регистрация</h2>
            </div>
            <div id="regLogM">
                <motion.div initial={action?{display:'none'}:{display:'flex'}} animate={controlsLog} id='LoginM' className='regLogDataWrapper'>
                    <h1 style={{ color: theme.palette.text.primary }}>Вход</h1>
                    <form 
                    onSubmit={(e)=>sendToServ(e,0)} 
                    id='lInputsM' 
                    style={{ color:theme.palette.text.ultra}}
                    className='InputsM'
                    >
                        <TextField 
                        error={logErr[1]}
                        type='email' 
                        label="Email" 
                        variant="standard" 
                        value={emailInput} 
                        onChange={(e)=>setEmailInput(e.target.value)}/>
                        <TextField 
                        error={logErr[0]}
                        type='password' 
                        label="Password" 
                        variant="standard" 
                        value={passwordInput} 
                        onChange={(e)=>setPasswordInput(e.target.value)}/>

                    </form>
                    <Button form='lInputsM' type='submit' className='regLogBnt' variant='contained'>Войти</Button>
                </motion.div>
                <motion.div initial={!action?{display:'none'}:{display:'flex'}} animate={controlsReg} id='RegM' className='regLogDataWrapper'>
                    <h1 style={{ color: theme.palette.text.primary }}>Регистрация</h1>
                    <form 
                    onSubmit={(e)=>sendToServ(e,1)} 
                    id='rInputsM' 
                    className='InputsM'
                    style={{ color:theme.palette.text.ultra}}>
                        <TextField type='name' label="First name" variant="standard" value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
                        <TextField type='name' label="Last name" variant="standard" value={fullNameInput} onChange={(e)=>setFullNameInput(e.target.value)}/>
                        <TextField error={regErr} type='email' label="Email" variant="standard" value={emailInput} onChange={(e)=>setEmailInput(e.target.value)}/>
                        <TextField type='password' label="Password" variant="standard" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}/>
                    </form>
                    <Button form='rInputsM' type='submit' className='regLogBnt' variant='contained'>Войти</Button>
                </motion.div>
            </div>            
        </div>
    );
});

export default RegLogM;
