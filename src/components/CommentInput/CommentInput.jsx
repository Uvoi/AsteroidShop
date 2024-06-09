import React, { useRef, useEffect, useState } from 'react';
import './styles.css';
import { Button } from '@mui/material';
import axios from 'axios';

const CommentInput = ({ theme, prodID, userID, updateComments=null }) => {
    const textareaRef = useRef(null);
    const [commentText, setCommentText] = useState(''); // Добавляем состояние для текста комментария

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        function autoResize() {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
        textarea.addEventListener('input', autoResize);
        return () => {
            textarea.removeEventListener('input', autoResize);
        };
    }, []);

    const setCommToServ = () => {
        const sendCommData = {
            ProdID: prodID,
            UserID: userID,
            Text: commentText  // Используем состояние commentText
        };
        axios.post(`http://localhost:8000/api/comments/add`, sendCommData, { withCredentials: true })  // Используем метод POST
            .then(response => {
                console.log("Success");
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCommToServ();
        updateComments();
        setCommentText("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <form className='CommentInput' onSubmit={handleSubmit}>
            <textarea
                placeholder='Введите комментарий'
                ref={textareaRef}
                className='inputComI'
                style={{
                    border: "1px solid " + theme.palette.text.primary,
                    color: theme.palette.text.primary
                }}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}  // Добавляем обработчик нажатия клавиш
            />
            <Button variant='contained' className='sendComI' type='submit'>✉️</Button>
        </form>
    );
};

export default CommentInput;
