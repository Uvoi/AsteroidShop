import React, { useContext } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import telegramLogo from '../../images/telegram.webp'
import vkLogo from '../../images/vk.webp'
import githubLogo from '../../images/github.svg'
import { useNotification } from '../../components/Notification/Notification';
import { themeContext } from '../../App';

const Contact = (props) => {
  const theme = useContext(themeContext)
  const showNotification = useNotification();

  const sendContact = () => {
    const nameInput = document.getElementById('nameHelp');
    const emailInput = document.getElementById('emailHelp');
    const messageTextarea = document.getElementById('messageHelp');

    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageTextarea.value.trim() === '') {
      showNotification("Заполните все поля", "red")
      return; 
    }

    console.log('Ваш запрос точно был отправлен на сервер, а не просто удален :)');
    showNotification('Сообщение отправлено', 'green');

    nameInput.value = '';
    emailInput.value = '';
    messageTextarea.value = '';
  };

  return (
    <div id='Help'>
      <div id='help'>
        <input style={{color:theme.palette.text.primary}} type='text' id='nameHelp' placeholder='Имя' />
        <input style={{color:theme.palette.text.primary}} type='email' id='emailHelp' placeholder='Эл. почта' />
        <textarea style={{color:theme.palette.text.primary}} type='text' id='messageHelp' placeholder='Текст обращения' />
        <div id='sendButtonHelp'>
          <Button variant="contained" onClick={sendContact} color="secondary">
            Отправить
            </Button>
        </div>
      </div>
      <div id="contactDataHelpWrapper">
      <div id='contactDataHelp'>
        <h1>Связь с нами</h1>
        <div id='contactDataImgsHelp'>
          <a href='https://t.me/asteroid_shop_proj' target='_blank' rel='noopener noreferrer'><img src={telegramLogo} alt='Telegram' /></a>
          <a href='https://github.com/Uvoi/AsteroidShop' target='_blank' rel='noopener noreferrer'><img src={githubLogo} alt="GitHub" /></a>
          <a href='https://vk.com/asteroid_shop_proj' target='_blank' rel='noopener noreferrer'><img src={vkLogo} alt='VK' /></a>
        </div>
        <div>
          <p>+7 (330) 133-01-33</p>
          <p>+7 (27) 922-41-469</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;
