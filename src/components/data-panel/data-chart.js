import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';
import { isEqual } from 'lodash';
import { dateDisplay } from '../../utilities/formatting';
import theme from '../../theme/theme';

// TODO: draw only filtered data
const generateDataset = (label, data, color) => {
  return({
    label,
    data: Object.values(data),
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
  })
}

const chartSetup = {
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

export default class PingChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
    }
    this.node = null;
    this.chart = null;
  }

  procData = () => {
    const { data } = this.props,
          { confirmed, recovered, deaths } = data,
          labels = Object.keys(confirmed).map(t => dateDisplay(new Date(t))),
          datasets = [
            generateDataset('Confirmed', confirmed, theme.color.infected),
            generateDataset('Recovered', recovered, theme.color.recovered),
            generateDataset('Deaths', deaths, theme.color.deaths),
          ];
    return { labels, datasets }
  }

  redraw = () => {
    const { chart, procData } = this;
    chart.data = procData();
    chart.update();
  }
  
  componentDidMount() {
    const { node, procData } = this;
    this.chart = new Chart(node, {
      type: 'line',
      data: procData(),
      options: chartSetup,
    });
  }

  componentDidUpdate(prevProps) {
    const { props, state, redraw } = this;
    if(prevProps !== props && !isEqual(state.data, props.data)) {
      redraw();
      this.setState({
        data: props.data,
      });
    }
  }

  render(){
    return <canvas ref={e => this.node = e} />;
  }
}
