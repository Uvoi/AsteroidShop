import React from 'react';
import './styles.css'
import { Backdrop, Button, Modal } from '@mui/material';
import { useTheme } from '../../themes/ThemeProvider';

interface ConfirmMProps
{
    open: boolean, 
    close: () => void, 
    message: string, 
    yes?: string, 
    no?: string,
    getResult: (res:boolean) => void,
}

const ConfirmM:React.FC<ConfirmMProps> = ({open, close, message, yes="Да", no="Отмена", getResult})=>
{
    const { theme } = useTheme();
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