import React from 'react'
import '../Styles/Negocio.css'

export function Negocio({ nombre, porcentaje }) {
  return (
    <div className='contenedor_negocio'>
      <div className='nombre'><h2 className='negocio_h2'>{nombre}</h2></div>
      <div className='porcentaje_negocio'><h2>{porcentaje}%</h2></div>
    </div>

  )
}