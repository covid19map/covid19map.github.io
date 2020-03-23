import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';
import theme from '../../theme/theme';

// TODO: data only til currentTime index
const generateDataset = (label, data, color) => {
  return({
    label,
    data: Object.values(data),
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
  })
}

export default class PingChart extends Component {
  constructor(props){
    super(props);
    this.node = null;
    this.chart = null;
  }
  
  componentDidMount() {
    const { data } = this.props,
          { confirmed, recovered, deaths } = data;
    this.chart = new Chart(this.node, {
      type: 'line',
      data: {
        labels: Object.keys(confirmed),
        datasets: [
          generateDataset('Confirmed', confirmed, theme.color.infected),
          generateDataset('Recovered', recovered, theme.color.recovered),
          generateDataset('Deaths', deaths, theme.color.deaths),
        ]
      },
      options: {
        elements: {
          point: { radius: 0 },
        },
        legend: { display: false },
        scales: {
          xAxes: [{ display: false }],
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        layout: {
          padding: {
            left: 25,
            right: 25,
            top: 40,
            bottom: 40,
          },
        },
      }
    });
  }

  render(){
    return <canvas ref={e => this.node = e} />;
  }
}
