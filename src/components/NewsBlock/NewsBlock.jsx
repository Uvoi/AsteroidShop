import React from 'react';
import './style.css';

const NewsBlock = ({theme}) => {
    // Здесь можно добавить логику получения и отображения новостей
    return (
        <div className="news-block"  style={{color: theme.palette.text.primary}}>
            
            <h2 style={{color: theme.palette.text.primary}}>Новости</h2>
            <ul>
                <li>Новость 1</li>
                <li>Новость 2</li>
                <li>Новость 3</li>
            </ul>
        </div>
    );
};

export default NewsBlock;