import React from 'react'
import { Charts } from './Charts.jsx'
import '../Styles/Botones.css'

export function Botones({ calcular, datos, enviar }) {
  return (
    <div className='contenedor'>
      <Charts datos ={datos}/>
      <button className='boton' onClick={calcular}>
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
      <button className='boton' onClick={enviar}>
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
