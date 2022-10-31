import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 290,
    borderRadius: '10px',
    p: 4,
    display: 'flex',
    justifyContent: 'center'
};

export function Progress({abrir}) {
    return (
        <div>
            <Modal
                open={abrir}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <CircularProgress />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}