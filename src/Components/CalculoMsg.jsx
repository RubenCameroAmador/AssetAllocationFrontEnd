import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../Styles/CalculoMsg.css'
// import { useEffect } from 'react'
// import { getLocalStorage } from '../helpers';

let style = {
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

export function CalculoMsg({ open, handleCloseCalculo, calculo }) {

    const colorCalculo = () => {
        //Verde, naranja y rojo
        const max = 100;  //Aquí va a ser 
        const colors = ['#00C040','#FE5000','#ED2E38']
        let porcentaje = (calculo*max)/100;
        if(porcentaje>90){
            return colors[0]
        }else{
            if(porcentaje>70){
                return colors[1]
            }else{
                return colors[2]
            }
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseCalculo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{backgroundColor: colorCalculo()}}>
                    <div className='contenedor_respuesta'>
                        <h2 className='calculo_titulo'>Resultado del cálculo</h2>
                        <h3 className='calculo_resultado'>{calculo}</h3>
                        <p className='calculo_texto'>El cálculo obtenido diverge de la solución máxima un {100-(calculo*100)/100}% </p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
