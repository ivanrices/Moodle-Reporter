import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [    
    {key: "Bajas", y: 20, color: "#3ebfea"},    
    {key: "Activos", y: 98, color: "#1de9b6"},
];

class PieDonutChart extends React.Component {

    render() {
        return <NVD3Chart id="chart" height={180} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    }
}

export default PieDonutChart;