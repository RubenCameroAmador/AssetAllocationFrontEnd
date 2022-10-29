import React, { Component } from 'react'

export class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.negocio = ['Transmisión', 'Almacenamiento', 'SED', 'Vías']
        this.paises = ['Colombia', 'Peru', 'Chile', 'Brasil', 'Bolivia', 'Panama', 'EEUU']
        this.totalNegocio = [0, 0, 0, 0]
        this.totalPais = [0, 0, 0, 0, 0, 0, 0]
    }

    totalXPais(pais) {
        //Este método devuelve la suma total por país
        let suma = 0;
        const matrix = this.props.datos
        const index = this.paises.indexOf(pais)
        for (var i = 0; i < this.negocio.length; i++) {
            suma = suma + matrix[index][i]
        }
        return suma
    }

    totalXNegocio(negocio) {
        let suma = 0;
        const matrix = this.props.datos
        const index = this.negocio.indexOf(negocio)
        for (var i = 0; i < this.negocio.length; i++) {
            suma = suma + matrix[i][index]
        }
        return suma
    }
    fillTotal() {
        this.totalNegocio[0] = this.totalXNegocio('Transmisión')
        this.totalNegocio[1] = this.totalXNegocio('Almacenamiento')
        this.totalNegocio[2] = this.totalXNegocio('SED')
        this.totalNegocio[3] = this.totalXNegocio('Vías')
        this.totalPais[0] = this.totalXPais('Colombia')
        this.totalPais[1] = this.totalXPais('Peru')
        this.totalPais[2] = this.totalXPais('Chile')
        this.totalPais[3] = this.totalXPais('Brasil')
        this.totalPais[4] = this.totalXPais('Bolivia')
        this.totalPais[5] = this.totalXPais('Panama')
        this.totalPais[6] = this.totalXPais('EEUU')
    }
    componentDidMount() {
        this.fillTotal();
        console.log(this.totalPais)
        console.log(this.totalNegocio)

    }
    render() {
        return (
            <div>Esto va a ser un gráfiquito</div>
        )
    }
}

export default PieChart