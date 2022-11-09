import React, { Component } from 'react'
import '../Styles/Field.css'

export class Field extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className='container'>
                <div className='containerCircle'></div>
                <div className='container_pais'>
                    <h3>{this.props.pais}</h3>
                </div>
                <div className='container_logic'>
                    <button className='left' onClick={this.props.resta} >-</button>
                    <input type="text" value={this.props.campo} disabled />
                    <button className='right' onClick={this.props.suma}>+</button>
                </div>
            </div>
        )
    }
}

export default Field