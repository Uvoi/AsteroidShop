import React, { useRef, useEffect, useState, useContext } from 'react';
import './styles.css';
import { Button } from '@mui/material';
import axios from 'axios';
import { themeContext } from '../../App';

const CommentInput = ({ prodID, userID, updateComments=null }) => {
    const theme = useContext(themeContext)
    const textareaRef = useRef(null);
    const [commentText, setCommentText] = useState('');

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
            Text: commentText
        };
        axios.post(`http://localhost:8000/api/comments/add`, sendCommData, { withCredentials: true })
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
                onKeyDown={handleKeyDown}
            />
            <Button variant='contained' className='sendComI' type='submit'>✉️</Button>
        </form>
    );
};

export default CommentInput;
