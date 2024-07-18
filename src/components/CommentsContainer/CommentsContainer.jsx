import React from 'react';
import './styles.css'


const CommentsContainer = ({children})=>
{
    return(
        <div id='CommentsContainer'>
            {children}
        </div>
    );
};

export default CommentsContainer;