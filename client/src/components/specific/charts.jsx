import React from 'react';
import {Line, Doughnut} from "react-chartjs-2";

import {Chart as ChartJS,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    plugins,
} from "chart.js"
import { orange, orangelight, purple, purplelight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';

ChartJS.register(
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

const labels = getLast7Days();

const lineChartOptions ={
    responsive: true,
    plugins:{
        legend:{
            display: false,
        },
        title: {
            display:false,
        },
    },

    scales: {
        x :{
            grid:{
                display: false,
            }
            //display: false,
        },
        y:{
            beginAtZero:true,
            grid: {
                display: false,
            }
            //display: false,
        },
    },
}

const LineChart= ({value = []}) => {

    const data = {
        labels,
        datasets:[
        {
            data:value,
            label:"",
            fill:true,
            backgroundColor:purplelight,
            borderColor: purple,
}],
    };

    return <Line data = {data} options = {lineChartOptions}/>
  
};

const doughnutchartOptions = {
    responsive: true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display: false,
        },
    },
    cutout:120,
};

const DoughtnutChart = ({value=[],labels})=>{

    const data = {
        labels,
        datasets:[
        {
            data:value,
            label:"Total Chats vs Groups Chats",
            backgroundColor:[purplelight,orangelight],
            hoverBackgroundColor:[purple,orange],
            borderColor:[purple,orange],
            offset:40,
        },
    ],
    };

  return <Doughnut 
  data = {data} 
  options = {doughnutchartOptions}
  style={{zIndex:10}}
  />

};

export {LineChart, DoughtnutChart};