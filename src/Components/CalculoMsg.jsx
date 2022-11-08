import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { useEffect } from 'react'
// import { getLocalStorage } from '../helpers';

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

export function CalculoMsg({open, handleCloseCalculo}) {
    // const [open, setOpen] = React.useState(false);
    // //const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     setOpen(true);
    // }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseCalculo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <h2>Resultado del cálculo</h2>
                        <h3>30</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat eveniet quibusdam cum, a natus ex illum praesentium necessitatibus molestias. Nostrum libero vitae nam, ipsum voluptates reiciendis eligendi ab doloribus sunt.</p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
