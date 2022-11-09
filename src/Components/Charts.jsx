import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {PieChart} from './PieChart.jsx'
import '../Styles/Charts.css'

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

export function Charts({ datos }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button onClick={handleOpen}>Gráficas</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <>
                            <h2 className='chart_title'>De esta forma ha distribuido sus monedas</h2>
                            <PieChart datos = {datos}/> 
                        </>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
