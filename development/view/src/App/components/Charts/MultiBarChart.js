import React from 'react';
//import NVD3Chart from 'react-nvd3';
import {HorizontalBar} from 'react-chartjs-2';



function getData(data, type) {
    let labels = []
    let datn = []
    let label = ""
    if(type == "participante"){
        label = "Total de participantes "
        const len =  data.length ;
        for (let i = 0; i < len; i++) {
            labels.push(
                data[i].fullname
           );
           datn.push(
            data[i].usercount
            );
        }
    }else{
        label = "Registros de actividad "
        const len =  data.length ;
        for (let i = 0; i < len; i++) {
            labels.push(
                 data[i].fullname
            );
            datn.push(
                data[i].total
                );
        }
    }
    

    const datos = {
        labels: labels,
       // yAxisID: datn,
        datasets: [
          {
            label: label,
            data: datn,
            backgroundColor: 'rgba(163,137,212,0.2)',
            borderColor: 'rgba(137,160,212,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(137,160,212,0.4)',
            hoverBorderColor: 'rgba(137,160,212,1)',
            
          }
        ]
      };
    return datos
}
class MultiBarChart extends React.Component {
    
    render() {
      console.log(this.props.data)
        //participante
        const data = getData(this.props.data,this.props.type);
        //return <NVD3Chart id="barChart" type="discreteBarChart" wrapLabels={true} margin={{top: 30, right: 20, bottom: 150, left: 20}} datum={data} x="x" y="y" height={500} showValues groupSpacing={0.2} showControls={false}/>
        return <HorizontalBar  data={data}/>
    }
}

export default MultiBarChart;