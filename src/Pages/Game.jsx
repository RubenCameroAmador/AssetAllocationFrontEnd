import React, { Component, Fragment } from 'react'
import { Field } from '../Components/Field.jsx'
import { Negocio } from '../Components/Negocio.jsx'
import { Botones } from '../Components/Botones.jsx'
import { Calculo } from '../Components/Calculo.jsx'
import { BasicModal } from '../Components/BasicModal.jsx'
import { Progress } from '../Components/Progress.jsx'
import { getLocalStorage } from '../helpers.js'
import { CalculoMsg } from '../Components/CalculoMsg.jsx'
import { ErrorMsg } from '../Components/ErrorMsg.jsx'
import { Horizonte } from '../Components/Horizonte.jsx'

import '../Styles/Game.css'
import axios from 'axios'

export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_monedas: 100,
            resCalculo: 0,
            open: false,
            porTrans: 0,
            porAlma: 0,
            porSED: 0,
            porVias: 0,
            openCalculo: false,
            openErrorMsg: false,
            errorMsg: ''
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
        this.porcentaje_monedas = [[0.24,0.02,0.02,0.08],
        [0.12,0.01,0.01,0.0],
        [0.08,0.01,0.02,0.1],
        [0.28,0.03,0.04,0.14],
        [0.05,0.0,0.0,0.0],
        [0.05,0.0,0.0,0.01],
        [0.17,0.30,0.0,0.0],
        [0.06,0.03,0.0,0.07]]
        this.porcentaje_pais = [0.35,0.14,0.21,0.50,0.05,0.05,0.47,0.16,0.0]
        this.porcentaje_negocio = [1.0,0.4,0.1,0.4]
    }

    handleClickSuma(pais, negocio) {
        const indexP = this.paises.indexOf(pais)
        const indexN = this.negocio.indexOf(negocio)
        const res = this.validarAddMoneda(pais, negocio)
        if (res.sucess === true) {
            if (this.state.total_monedas > 0) {
                this.nego_pais[indexP][indexN] = this.nego_pais[indexP][indexN] + 1
                this.setState(state => ({
                    total_monedas: state.total_monedas - 1
                }))
            }
        } else {
            this.setState({errorMsg: res.msg})
            this.handleOpenErrorMsg()
            // alert(res.msg)
        }
        this.porcentajeAsignadoNegocio()

    }

    validarAddMoneda(pais, negocio) {
        //Este método valida el total de monedas
        const indexP = this.paises.indexOf(pais)
        const indexN = this.negocio.indexOf(negocio)

        if (this.nego_pais[indexP][indexN] < this.total * this.porcentaje_monedas[indexP][indexN]) {
            if (this.totalXNegocio(negocio) < this.total * this.porcentaje_negocio[indexN]) {  //negocio
                if (this.totalXPais(pais) < this.total * this.porcentaje_pais[indexP]) { //país
                    return {
                        'sucess': true,
                        'msg': 'Todo ok'
                    };
                } else {  //sino de país
                    return {
                        'sucess': false,
                        'msg': `El total de monedas distribuidas en el país ${pais} excede el ${this.porcentaje_pais[indexP] * 100}% permitido`
                    };
                }
            } else {  //sino de negocio
                return {
                    'sucess': false,
                    'msg': `El total de monedas distribuidas en el negocio ${negocio} excede el ${this.porcentaje_negocio[indexN] * 100}% permitido`
                };
            }
        } else {
            return {
                'sucess': false,
                'msg': `Ha superado el número total de monedas permitidos en ${negocio} - ${pais}`
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

    totalXNegocio(negocio) {
        //Este método devuelve la suma total por negocio
        let suma = 0;
        const index = this.negocio.indexOf(negocio)
        for (var i = 0; i < this.paises.length; i++) {
            suma = suma + this.nego_pais[i][index]
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
        this.porcentajeAsignadoNegocio()
    }

    porcentajeAsignadoNegocio() {
        const transmisión = this.totalXNegocio('transmisión')
        const almacenamiento = this.totalXNegocio('almacenamiento')
        const sed = this.totalXNegocio('SED')
        const vias = this.totalXNegocio('vias')
        this.setState({ porTrans: transmisión, porAlma: almacenamiento, porSED: sed, porVias: vias })
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
                    // alert('¡Cálculo éxitoso!: ' + response.data.resultado) //Justo aquí, positivo
                    this.handleOpenCalculo()
                } else {
                    alert(response.data.msg) //Justo aquí, negativo
                }
                this.setState({ open: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ open: false })
            })
    }

    submitSend() {
        let respuesta = window.confirm("¿Desea enviar y continuar con el siguiente horizonte de tiempo?")
        if (respuesta) {
            this.handleProgress();
            const ruta_envio = `https://assetallocationbackend.herokuapp.com/resultado/user/${getLocalStorage("user_id")}/year/2030`
            axios.post(ruta_envio, this.createJson())
                .then(response => {
                    alert(response.data.msg)
                    this.setState({ open: false })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ open: false })
                })
        }


    }

    handleProgress() {
        this.setState({ open: true })
    }
    handleOpenCalculo() {
        this.setState({ openCalculo: true })
    }
    handleCloseCalculo() {
        this.setState({ openCalculo: false })
    }
    handleOpenErrorMsg() {
        this.setState({ openErrorMsg: true })
    }
    handleCloseErrorMsg() {
        this.setState({ openErrorMsg: false })
    }

    render() {
        const { total_monedas, resCalculo, open, porTrans, porAlma, porSED, porVias, openCalculo, openErrorMsg, errorMsg } = this.state
        return (
            <Fragment>
                <Horizonte año={2025}/>
                <Calculo valor={resCalculo} total_monedas={total_monedas} />
                <Negocio nombre={'Transmisión'} porcentaje={porTrans} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][0]} suma={() => this.handleClickSuma('colombia', 'transmisión')} resta={() => this.handleClickResta('colombia', 'transmisión')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][0]} suma={() => this.handleClickSuma('peru', 'transmisión')} resta={() => this.handleClickResta('peru', 'transmisión')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][0]} suma={() => this.handleClickSuma('chile', 'transmisión')} resta={() => this.handleClickResta('chile', 'transmisión')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][0]} suma={() => this.handleClickSuma('brasil', 'transmisión')} resta={() => this.handleClickResta('brasil', 'transmisión')} />
                <Field pais={"Bolivia"} campo={this.nego_pais[4][0]} suma={() => this.handleClickSuma('bolivia', 'transmisión')} resta={() => this.handleClickResta('bolivia', 'transmisión')} />
                <Field pais={"Panamá"} campo={this.nego_pais[5][0]} suma={() => this.handleClickSuma('panama', 'transmisión')} resta={() => this.handleClickResta('panama', 'transmisión')} />
                <Field pais={"EE.UU"} campo={this.nego_pais[6][0]} suma={() => this.handleClickSuma('EEUU', 'transmisión')} resta={() => this.handleClickResta('EEUU', 'transmisión')} />
                <Field pais={"México"} campo={this.nego_pais[7][0]} suma={() => this.handleClickSuma('mexico', 'transmisión')} resta={() => this.handleClickResta('mexico', 'transmisión')} />
                <Negocio nombre={'Almacenamiento'} porcentaje={porAlma} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][1]} suma={() => this.handleClickSuma('colombia', 'almacenamiento')} resta={() => this.handleClickResta('colombia', 'almacenamiento')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][1]} suma={() => this.handleClickSuma('peru', 'almacenamiento')} resta={() => this.handleClickResta('peru', 'almacenamiento')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][1]} suma={() => this.handleClickSuma('chile', 'almacenamiento')} resta={() => this.handleClickResta('chile', 'almacenamiento')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][1]} suma={() => this.handleClickSuma('brasil', 'almacenamiento')} resta={() => this.handleClickResta('brasil', 'almacenamiento')} />
                <Field pais={"EE.UU"} campo={this.nego_pais[6][1]} suma={() => this.handleClickSuma('EEUU', 'almacenamiento')} resta={() => this.handleClickResta('EEUU', 'almacenamiento')} />
                <Field pais={"México"} campo={this.nego_pais[7][1]} suma={() => this.handleClickSuma('mexico', 'almacenamiento')} resta={() => this.handleClickResta('mexico', 'almacenamiento')} />
                <Negocio nombre={'SED'} porcentaje={porSED} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][2]} suma={() => this.handleClickSuma('colombia', 'SED')} resta={() => this.handleClickResta('colombia', 'SED')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][2]} suma={() => this.handleClickSuma('peru', 'SED')} resta={() => this.handleClickResta('peru', 'SED')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][2]} suma={() => this.handleClickSuma('chile', 'SED')} resta={() => this.handleClickResta('chile', 'SED')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][2]} suma={() => this.handleClickSuma('brasil', 'SED')} resta={() => this.handleClickResta('brasil', 'SED')} />
                <Negocio nombre={'Vías'} porcentaje={porVias} />
                <Field pais={"Colombia"} campo={this.nego_pais[0][3]} suma={() => this.handleClickSuma('colombia', 'vias')} resta={() => this.handleClickResta('colombia', 'vias')} />
                <Field pais={"Perú"} campo={this.nego_pais[1][3]} suma={() => this.handleClickSuma('peru', 'vias')} resta={() => this.handleClickResta('peru', 'vias')} />
                <Field pais={"Chile"} campo={this.nego_pais[2][3]} suma={() => this.handleClickSuma('chile', 'vias')} resta={() => this.handleClickResta('chile', 'vias')} />
                <Field pais={"Panamá"} campo={this.nego_pais[5][3]} suma={() => this.handleClickSuma('panama', 'vias')} resta={() => this.handleClickResta('panama', 'vias')} />
                <Field pais={"Brasil"} campo={this.nego_pais[3][3]} suma={() => this.handleClickSuma('brasil', 'vias')} resta={() => this.handleClickResta('brasil', 'vias')} />
                <Field pais={"México"} campo={this.nego_pais[7][3]} suma={() => this.handleClickSuma('mexico', 'vias')} resta={() => this.handleClickResta('mexico', 'vias')} />
                <Botones calcular={() => this.submitHandler()} datos={this.nego_pais} envio={() => this.submitSend()} />
                <Progress abrir={open} />
                <BasicModal />
                <CalculoMsg open={openCalculo} handleCloseCalculo={() => this.handleCloseCalculo()} calculo={resCalculo} />
                <ErrorMsg open={openErrorMsg} mensaje={errorMsg} handleClose={() => this.handleCloseErrorMsg()} />
            </Fragment>
        )
    }
}

export default Game