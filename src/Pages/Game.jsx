import React, { Component, Fragment } from 'react'
import { Field } from '../Components/Field.jsx'
import { Negocio } from '../Components/Negocio.jsx'
import { Botones } from '../Components/Botones.jsx'
import { Calculo } from '../Components/Calculo.jsx'
import { BasicModal } from '../Components/BasicModal.jsx'
import {Progress} from '../Components/Progress.jsx'

import '../Styles/Game.css'
import axios from 'axios'

export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_monedas: 100,
            resCalculo: 0,
            open:false
        }
        this.total = 100;
        this.negocio = ['transmisión', 'almacenamiento', 'SED', 'vias']
        this.paises = ['colombia', 'peru', 'chile', 'brasil', 'bolivia', 'panama', 'EEUU', 'mexico', 'argentina']
        this.nego_transmision = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.nego_pais = [[0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0]]
        this.porcentaje_monedas = [[0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5],
                                   [0.5, 0.5, 0.5, 0.5]]
        this.porcentaje_pais = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    }

    handleClickSuma(pais, negocio) {
        const indexP = this.paises.indexOf(pais)
        const indexN = this.negocio.indexOf(negocio)
        const res = this.validarAddMoneda(pais, negocio)
        if ( res.sucess === true) {
            if (this.state.total_monedas > 0) {
                this.nego_pais[indexP][indexN] = this.nego_pais[indexP][indexN] + 1
                this.setState(state => ({
                    total_monedas: state.total_monedas - 1
                }))
            }
        }else{
            alert(res.msg)
        }

    }

    validarAddMoneda(pais, negocio) {
        //Este método valida el total de monedas
        const indexP = this.paises.indexOf(pais)
        const indexN = this.negocio.indexOf(negocio)
        if (this.nego_pais[indexP][indexN]+1 < this.total * this.porcentaje_monedas[indexP][indexN]) {
            if (this.totalXPais(pais) < this.porcentaje_pais[indexP] * this.total) {
                return {
                    'sucess': true,
                    'msg': 'Todo ok'
                };
            } else {
                return {
                    'sucess': false,
                    'msg': `El total del país ${pais} excede el ${this.porcentaje_pais[indexP]*100}% permitido`
                };
            }
        } else {
            return {
                'sucess': false,
                'msg': `Ha superado el número total de monedas permitidos en este país`
            };
        }
    }

    totalXPais(pais) {
        //Este método devuelve la suma total por país
        let suma = 0;
        const index = this.paises.indexOf(pais)
        for (var i = 0; i < this.negocio.length; i++) {
            suma = suma + this.nego_pais[index][i]
        }
        return suma
    }

    handleClickResta(pais, negocio) {
        const indexP = this.paises.indexOf(pais)
        const indexN = this.negocio.indexOf(negocio)
        if (this.state.total_monedas < 100 && this.nego_pais[indexP][indexN] > 0) {
            this.nego_pais[indexP][indexN] = this.nego_pais[indexP][indexN] - 1
            this.setState(state => ({
                total_monedas: state.total_monedas + 1
            }))
        }
    }

    createJson() {
        const body = [
            {
                "categoria": "Transmisión",
                "colombia": this.nego_pais[0][0],
                "peru": this.nego_pais[1][0],
                "chile": this.nego_pais[2][0],
                "brasil": this.nego_pais[3][0],
                "bolivia": this.nego_pais[4][0],
                "panama": this.nego_pais[5][0],
                "EEUU": this.nego_pais[6][0],
                "mexico": this.nego_pais[7][0]
            },
            {
                "categoria": "Almacenamiento",
                "colombia": this.nego_pais[0][1],
                "peru": this.nego_pais[1][1],
                "chile": this.nego_pais[2][1],
                "brasil": this.nego_pais[3][1],
                "EEUU": this.nego_pais[6][1],
                "mexico": this.nego_pais[7][1]
            },
            {
                "categoria": "SED",
                "colombia": this.nego_pais[0][2],
                "peru": this.nego_pais[1][2],
                "chile": this.nego_pais[2][2],
                "brasil": this.nego_pais[3][2]
            },
            {
                "categoria": "Vias",
                "colombia": this.nego_pais[0][3],
                "peru": this.nego_pais[1][3],
                "chile": this.nego_pais[2][3],
                "brasil": this.nego_pais[3][3],
                "panama": this.nego_pais[5][3],
                "mexico": this.nego_pais[7][3]
                
            }
        ]
        return body
    }

    submitHandler() {
        this.handleProgress();
        axios.post('https://assetallocationbackend.herokuapp.com/modelo', this.createJson())
            .then(response => {
                if (response.data.sucess) {
                    this.setState(state => ({
                        resCalculo: response.data.resultado
                    }))
                    alert('¡Cálculo éxitoso!: ' + response.data.resultado)
                } else {
                    alert(response.data.msg)
                }
                this.setState({open: false})
                console.log("despues de: ",this.state.open)
            })
            .catch(error => {
                console.log(error)
                this.setState({open: false})
            })
    }

    handleProgress(){
        console.log("antes de: ",this.state.open)
        this.setState({open: true})
    }

    render() {
        const { total_monedas, resCalculo, open } = this.state
        return (
            <Fragment>
                <Calculo valor={resCalculo} total_monedas={total_monedas} />
                <Negocio nombre={'Transmisión'} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][0]} suma={() => this.handleClickSuma('colombia', 'transmisión')} resta={() => this.handleClickResta('colombia', 'transmisión')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][0]} suma={() => this.handleClickSuma('peru', 'transmisión')} resta={() => this.handleClickResta('peru', 'transmisión')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][0]} suma={() => this.handleClickSuma('chile', 'transmisión')} resta={() => this.handleClickResta('chile', 'transmisión')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][0]} suma={() => this.handleClickSuma('brasil', 'transmisión')} resta={() => this.handleClickResta('brasil', 'transmisión')} />
                <Field pais={"Bolivia"} campo={this.nego_pais[4][0]} suma={() => this.handleClickSuma('bolivia', 'transmisión')} resta={() => this.handleClickResta('bolivia', 'transmisión')} />
                <Field pais={"Panamá"} campo={this.nego_pais[5][0]} suma={() => this.handleClickSuma('panama', 'transmisión')} resta={() => this.handleClickResta('panama', 'transmisión')} />
                <Field pais={"EE.UU"} campo={this.nego_pais[6][0]} suma={() => this.handleClickSuma('EEUU', 'transmisión')} resta={() => this.handleClickResta('EEUU', 'transmisión')} />
                <Field pais={"México"} campo={this.nego_pais[7][0]} suma={() => this.handleClickSuma('mexico', 'transmisión')} resta={() => this.handleClickResta('mexico', 'transmisión')} />
                <Negocio nombre={'Almacenamiento'} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][1]} suma={() => this.handleClickSuma('colombia', 'almacenamiento')} resta={() => this.handleClickResta('colombia', 'almacenamiento')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][1]} suma={() => this.handleClickSuma('peru', 'almacenamiento')} resta={() => this.handleClickResta('peru', 'almacenamiento')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][1]} suma={() => this.handleClickSuma('chile', 'almacenamiento')} resta={() => this.handleClickResta('chile', 'almacenamiento')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][1]} suma={() => this.handleClickSuma('brasil', 'almacenamiento')} resta={() => this.handleClickResta('brasil', 'almacenamiento')} />
                <Field pais={"EE.UU"} campo={this.nego_pais[6][1]} suma={() => this.handleClickSuma('EEUU', 'almacenamiento')} resta={() => this.handleClickResta('EEUU', 'almacenamiento')} />
                <Field pais={"México"} campo={this.nego_pais[7][1]} suma={() => this.handleClickSuma('mexico', 'almacenamiento')} resta={() => this.handleClickResta('mexico', 'almacenamiento')} />
                <Negocio nombre={'SED'} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][2]} suma={() => this.handleClickSuma('colombia', 'SED')} resta={() => this.handleClickResta('colombia', 'SED')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][2]} suma={() => this.handleClickSuma('peru', 'SED')} resta={() => this.handleClickResta('peru', 'SED')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][2]} suma={() => this.handleClickSuma('chile', 'SED')} resta={() => this.handleClickResta('chile', 'SED')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][2]} suma={() => this.handleClickSuma('brasil', 'SED')} resta={() => this.handleClickResta('brasil', 'SED')} />
                <Negocio nombre={'Vías'} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][3]} suma={() => this.handleClickSuma('colombia', 'vias')} resta={() => this.handleClickResta('colombia', 'vias')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][3]} suma={() => this.handleClickSuma('peru', 'vias')} resta={() => this.handleClickResta('peru', 'vias')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][3]} suma={() => this.handleClickSuma('chile', 'vias')} resta={() => this.handleClickResta('chile', 'vias')} />
                <Field pais={"Panamá"} campo={this.nego_pais[5][3]} suma={() => this.handleClickSuma('panama', 'vias')} resta={() => this.handleClickResta('panama', 'vias')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][3]} suma={() => this.handleClickSuma('brasil', 'vias')} resta={() => this.handleClickResta('brasil', 'vias')} />
                <Field pais={"México"} campo={this.nego_pais[7][3]} suma={() => this.handleClickSuma('mexico', 'vias')} resta={() => this.handleClickResta('mexico', 'vias')} />
                <Botones calcular={() => this.submitHandler()} datos ={this.nego_pais}/>
                <Progress abrir= {open}/>
                <BasicModal/>
            </Fragment>
        )
    }
}

export default Game