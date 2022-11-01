import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react'
import '../Styles/BasicModal.css'
import { getLocalStorage } from '../helpers';

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
                            <h2 className='intro_header'>¡Bienvenido {getLocalStorage("user_name")}!</h2>
                            <h4 className='intro_rules'>Reglas de juego</h4>
                        </>
                    </div>
                    <div className='intro-contenido'>
                        <p className='intro-contenido-parrafo'>En este juego tiene la misión de distribuir unidades monetarias en diferentes negocios y países, tenga en cuenta que los recursos son limitados así que la forma como los distribuya garantiza una buena o mala calificación</p>
                        <ol>
                            <li>El total de monedas que puede distribuir son 100</li>
                            <li>La cantidad de monedas que puede distribuir entre negocios y países está limitada por el potencial capturable</li>
                            <li>Se ejecutarán automáticamente algunas restricciones, les aparecerá en forma de mensaje</li>
                        </ol>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
