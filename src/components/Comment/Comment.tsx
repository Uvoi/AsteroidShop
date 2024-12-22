import React from 'react';
import './styles.css'

import userPic from './../../images/userImg.webp'
import { Link } from 'react-router-dom';
import { useTheme } from '../../themes/ThemeProvider';

interface CommentProps
{
    user: string, 
    customerId: number, 
    dateTime:string, 
    photo: string, 
    children: React.ReactNode
}

const Comment:React.FC<CommentProps> = ({user, customerId, dateTime, photo, children})=>
{
    const { theme } = useTheme();
    return(
        <div id='Comment'>
            <div id='comment'>
                <div id="picAndUsernameCom" style={{color: theme.palette.text.ultra}}>
                    <Link to={'/user?id='+customerId}>
                        <img src={photo?photo:userPic} alt="" />
                        {user}
                    </Link>
                </div>
                <div id="dataCom">
                    <div id="textCom" style={{color: theme.palette.text.primary, borderLeft: "1px solid"+theme.palette.text.secondary}}>{children}</div>
                    <div id="dateTimeCom" style={{color: theme.palette.text.secondary}}>{dateTime}</div>
                </div>
            </div>
        </div>
    );
};

export default Comment;