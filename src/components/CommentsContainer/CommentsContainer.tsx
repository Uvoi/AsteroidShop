import React from 'react';
import './styles.css'

interface CommentsContainerProps
{
    children: React.ReactNode,
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({children})=>
{
    return(
        <div id='CommentsContainer'>
            {children}
        </div>
    );
};

export default CommentsContainer;