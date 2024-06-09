import React from 'react';
import './styles.css'

import userPic from './../../images/userImg.png'


const Comment = ({theme, user, dateTime, children})=>
{
    return(
        <div id='Comment'>
            <div id='comment'>
                <div id="picAndUsernameCom" style={{color: theme.palette.text.ultra}}>
                    <img src={userPic} alt="" />
                    {user}
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