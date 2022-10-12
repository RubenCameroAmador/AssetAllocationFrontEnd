import React, { Fragment } from 'react'
import '../Styles/Calculo.css'

export function Calculo({ valor, total_monedas }) {
  return (
    <Fragment>
      <div className='contenedor_calculo'>
        <div>
          <div className='total_monedas'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coin" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffbf00" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
              <path d="M12 6v2m0 8v2" />
            </svg>
            <h4 className='total_monedas_h4'>{total_monedas}</h4>
          </div>
        </div>
        <div className='resultado'>
          <h4 className='header'>Cálculo {valor}</h4>
        </div>
      </div>
    </Fragment>
  )
}
