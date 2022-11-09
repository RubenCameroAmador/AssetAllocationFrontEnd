import React, { Component } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: []
        }
        this.negocio = ['Transmisión', 'Almacenamiento', 'SED', 'Vías']
        this.paises = ['Colombia', 'Peru', 'Chile', 'Brasil', 'Bolivia', 'Panama', 'EEUU']
        this.totalNegocio = [0, 0, 0, 0]
        this.totalPais = [0, 0, 0, 0, 0, 0, 0]
        this.items_negocio = []
        this.data = {
            labels: ['Transmisión', 'Almacenamiento', 'SED', 'Vías'],
            datasets: [
                {
                    label: '# of Votes',
                    // data: [12, 19, 3, 5],
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
    }
    render() {
        return (
            <div >
                {/* <DonutChart items = {this.items_negocio} /> */}
                <Doughnut data={this.data} />
            </div>
        )
    }
}

export default PieChart