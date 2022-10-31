import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.negocio = ['Transmisión', 'Almacenamiento', 'SED', 'Vías']
        this.paises = ['Colombia', 'Peru', 'Chile', 'Brasil', 'Bolivia', 'Panama', 'EEUU']
        this.totalNegocio = [0, 0, 0, 0]
        this.totalPais = [0, 0, 0, 0, 0, 0, 0]
        this.coloresNegocio = []
        this.dataNegocio = []
        this.opcionesNegocio = []
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

    generarCaracter() {
        const caracter = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        let numero = (Math.random() * 15).toFixed(0);
        return caracter[numero];
    }

    colorHex() {
        let color = ""
        for (let i = 0; i < 6; i++) {
            color = color + this.generarCaracter();
        }
        return "#" + color;
    }

    generarColores() {
        let colores = []
        for (let i = 0; i < this.totalNegocio.length; i++) {
            colores.push(this.colorHex());
        }
        this.coloresNegocio = colores
    }

    configurarGraficaNegocio() {
        const data = {
            datasets: [{
                label: 'My First Dataset',
                data: [20, 30, 40],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            }],
            labels: [
                'tran',
                'alma',
                'sed'
            ]
        }
        const opciones = {
            responsive: true,
            maintainAspectRatio: false
        }
        this.dataNegocio = data
        this.opcionesNegocio = opciones
        console.log("negocio: ")
        console.log(this.dataNegocio)
        console.log("opciones " + this.opcionesNegocio)
    }

    componentDidMount() {
        this.fillTotal();
        //console.log(this.totalPais)
        //console.log(this.totalNegocio)
        this.generarColores()
        this.configurarGraficaNegocio();

    }
    render() {
        return (
            <div style={{ maxWidth: '90%', height: '300px' }}>
                <Pie data={this.dataNegocio} options={this.opcionesNegocio} />
            </div>
        )
    }
}

export default PieChart