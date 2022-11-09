import React, { Component } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.negocio = ['Transmisión', 'Almacenamiento', 'SED', 'Vías']
        this.paises = ['Colombia', 'Peru', 'Chile', 'Brasil', 'Bolivia', 'Panama', 'EEUU', 'México']
        this.totalNegocio = [0, 0, 0, 0]
        this.totalPais = [0, 0, 0, 0, 0, 0, 0, 0]
        this.items_negocio = []
        this.data = {
            labels: ['Transmisión', 'Almacenamiento', 'SED', 'Vías'],
            datasets: [
                {
                    label: 'Negocio',
                    data: this.totalNegocio,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        this.data_paises = {
            labels: ['Colombia', 'Peru', 'Chile', 'Brasil', 'Bolivia', 'Panama', 'EEUU', 'México'],
            datasets: [
                {
                    label: 'País',
                    data: this.totalPais,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 180, 190, 0.2)',
                        'rgba(66, 112, 90, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 180, 190, 1)',
                        'rgba(66, 112, 90, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        };
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
        for (var i = 0; i < this.paises.length; i++) {
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
        this.totalPais[7] = this.totalXPais('México')
    }

    componentDidMount() {
        this.fillTotal();
    }
    render() {
        return (
            <div >
                {/* <DonutChart items = {this.items_negocio} /> */}
                <h3 className='chart_label'>Total por negocio</h3>
                <Doughnut data={this.data} />
                <h3 className='chart_label'>Total por país</h3>
                <Doughnut data={this.data_paises} />
            </div>
        )
    }
}

export default PieChart