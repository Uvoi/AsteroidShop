import React, { useContext } from 'react';
import './styles.css'
import { Backdrop, Button, Modal } from '@mui/material';
import { themeContext } from '../../App';

const ConfirmM = ({open, close, message, yes="Да", no="Отмена", getResult})=>
{
    const theme = useContext(themeContext)
    return(
        <Modal 
            className='ConfirmM'
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                timeout: 1000,
                },
            }}>  
                <div className='ConfirmMContent' style={{background: theme.palette.primary.dark, }}>
                    <p style={{color: '#fff'}}>{message}</p>
                    <div className="ConfirmMButtons">
                        <Button variant='contained' onClick={()=>{getResult(true); close()}} style={{background:theme.palette.error.main}}>{yes}</Button>
                        <Button variant='contained' onClick={()=>{getResult(false); close()}}>{no}</Button>
                    </div>
                </div>           
        </Modal>
    );
};

export default ConfirmM;