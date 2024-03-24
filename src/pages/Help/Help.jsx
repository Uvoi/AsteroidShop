import React from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import telegramLogo from '../../images/telegram.png'
import vkLogo from '../../images/vk.png'
import githubLogo from '../../images/github.svg'
import { useNotification } from '../../components/Notification/Notification';

const Contact = (props) => {
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
        <input type='text' id='nameHelp' placeholder='Имя' />
        <input type='email' id='emailHelp' placeholder='Эл. почта' />
        <textarea type='text' id='messageHelp' placeholder='Текст обращения' />
        <div id='sendButtonHelp'>
          <Button variant="contained" onClick={sendContact} color="primary">
            Отправить
            </Button>
        </div>
      </div>
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
  );
};

export default Contact;
