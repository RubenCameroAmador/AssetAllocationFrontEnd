import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react'
import '../Styles/BasicModal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 290,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export function BasicModal() {
    const [open, setOpen] = React.useState(false);
    //const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <>
                            <h2 className='intro_header'>¡Bienvenidos!</h2>
                            <h4 className='intro_rules'>Reglas de juego</h4>
                        </>
                    </div>
                    <div>
                        <ol>
                            <li>Regla</li>
                            <li>Regla</li>
                            <li>Regla</li>
                            <li>Regla</li>
                        </ol>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}