import React, { useRef, useEffect, useState, useContext } from 'react';
import './styles.css';
import { Button } from '@mui/material';
import { addNewComment } from '../../functions/comments';
import { useTheme } from '../../themes/ThemeProvider';

interface CommentInputProps {
  prodID: number;
  userEmail: string;
  updateComments: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ prodID, userEmail, updateComments }) => {
  const { theme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    function autoResize() {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            }          
    }

    textarea.addEventListener('input', autoResize);
    return () => {
      textarea.removeEventListener('input', autoResize);
    };
  }, []);

  const setCommToServ = async () => {
    await addNewComment(prodID, userEmail, commentText);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setCommToServ();
    updateComments();
    setCommentText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="CommentInput" onSubmit={handleSubmit}>
      <textarea
        placeholder="Введите комментарий"
        ref={textareaRef}
        className="inputComI"
        style={{
          border: `1px solid ${theme.palette.text.primary}`,
          color: theme.palette.text.primary,
        }}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" className="sendComI" type="submit">
        ✉️
      </Button>
    </form>
  );
};

export default CommentInput;
