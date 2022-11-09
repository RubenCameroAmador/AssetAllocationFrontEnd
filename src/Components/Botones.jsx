import React, { useState } from 'react'
import { Charts } from './Charts.jsx'
import '../Styles/Botones.css'

export function Botones({ calcular, datos, envio }) {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='contenedor'>
      <Charts datos={datos} open={open} handleClose={handleClose} />
      <div className='botones_dos'>
        <button className='boton boton_dos_inside' onClick={handleOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-infographic" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="7" cy="7" r="4" />
            <path d="M7 3v4h4" />
            <line x1="9" y1="17" x2="9" y2="21" />
            <line x1="17" y1="14" x2="17" y2="21" />
            <line x1="13" y1="13" x2="13" y2="21" />
            <line x1="21" y1="12" x2="21" y2="21" />
          </svg>
          <h4 className='calcular_valor'>Gráfica</h4>
        </button>
        <button className='boton boton_dos_inside' onClick={calcular}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calculator calcular_icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <rect x="8" y="7" width="8" height="3" rx="1" />
            <line x1="8" y1="14" x2="8" y2="14.01" />
            <line x1="12" y1="14" x2="12" y2="14.01" />
            <line x1="16" y1="14" x2="16" y2="14.01" />
            <line x1="8" y1="17" x2="8" y2="17.01" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
            <line x1="16" y1="17" x2="16" y2="17.01" />
          </svg>
          <h4 className='calcular_valor'>Calcular</h4>
        </button>
      </div>

      <button className='boton last_button' onClick={envio}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send calcular_icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="10" y1="14" x2="21" y2="3" />
          <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
        <h4 className='calcular_valor'>Enviar</h4>
      </button>
    </div>
  )
}
