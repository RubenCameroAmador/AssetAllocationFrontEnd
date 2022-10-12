import React from 'react'
import '../Styles/Negocio.css'

export function Negocio({nombre}) {
  return (
    <div className='nombre'><h2 className='negocio_h2'>{nombre}</h2></div>
  )
}