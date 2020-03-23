import React, { Component } from 'react';
import './discrete-slider.css';

const identity = (x) => x;

const removeDuplicates = (array) => (
  array.filter((v, i, self) => self.indexOf(v) === i)
);

const filterRange = (array, min, max) => (
  array.filter((x) => x < max).filter((x) => x > min)
);

const findSmallestGap = (set) => (
  // assumes an ordered array without duplicate entries
  Math.min(...set.map((x, i) => (
    i === 0 ? set[set.length - 1] : Math.abs(x - set[i - 1])
  )))
);

const findClosestPoint1d = (x0, set) => {
  // assumes a number and an ordered array without duplicate entries
  const D = set.map((x) => Math.abs(x - x0));
  return set[D.indexOf(Math.min(...D))];
}

const evalSliderMarkerPos = (x) => (
  // x*100 - c
  // where c = 5*(x - .5) is the correction term,
  // the scaled distance from the mid point.
  // =>
  x*100 - 5*(x - .5)
);

export default class DiscreteSlider extends Component {
  constructor(props){
    super(props);
    const {
      max = 0,
      min = 100,
      availableValues = [],
      formatValue = identity,
    } = props;
    this.formatValue = formatValue;
    this.availableValues = filterRange(removeDuplicates(availableValues), min, max).sort();
    this.availableValues.unshift(min);
    this.availableValues.push(max);
    this.snapRange = Math.min(
      (max - min) / 25,
      findSmallestGap(this.availableValues) / 2,
    );
    this.state = {
      value: 0,
      isDragging: false,
      isSnapped: false,
    }
  }
  
  onMouseDown = () => {
    this.setState({ isDragging: true });
  }
  
  onMouseUp = () => {
    const { props, state, availableValues } = this;
    let { value } = state;
    value = findClosestPoint1d(value, availableValues);
    props.onChange(value);
    this.setState({
      value,
      isDragging: false,
      isSnapped: true,
    });
  }
  
  onChange = ({ target }) => {
    const { props, availableValues, snapRange } = this;
    let { value } = target,
        isSnapped = false;
    for(const option of availableValues) {
      const D = Math.abs(value - option);
      if(D < snapRange) {
        value = option;
        isSnapped = true;
        value = Number(value);
        props.onChange(value);
        break;
      }
    }
    //value = Number(value);
    //props.onChange(value);
    this.setState({
      value,
      isSnapped,
    });
  }
  
  componentDidMount() {
    if(this.availableValues.length === 2) {
      console.log('Warning: Select has no available values apart from the edges');
    }
    const { props } = this,
          { min, startValue } = props,
          value = findClosestPoint1d(startValue, this.availableValues) || min;
    props.onChange(value);
    this.setState({
      value,
      isSnapped: true,
    });
  }

  render() {
    const {
      props,
      state,
      availableValues,
      formatValue,
      onChange,
      onMouseDown,
      onMouseUp,
    } = this;
    const { min, max } = props;
    const { value, isDragging, isSnapped } = state;
    const paramsInput = {
      type: 'range',
      min,
      max,
      value: value || min,
      onChange,
      onMouseDown,
      onMouseUp,
      onTouchStart: onMouseDown,
      onTouchEnd: onMouseUp,
    }
    const range = Math.abs(max - min);
    const left = `${evalSliderMarkerPos((value - min) / range)}%`;
    const subclsDragging = isDragging ? 'dragging' : '';
    const subclsSnapped = isSnapped ? 'snapped' : '';
    const cls = `discrete-slider ${subclsDragging}`;
    const paramsThumb = {
      className: 'discrete-slider__thumb',
      style: { left },
    }
    const paramsThumbAnimation = {
      className: `discrete-slider__thumb-animation ${subclsDragging}`,
      style: { left },
    }
    const paramsDisplayValue = {
      className: `discrete-slider__display-value ${subclsSnapped}`,
      style: {
        display: value <= min + this.snapRange || value >= max - this.snapRange ? 'none' : 'block',
        left,
      }
    }
    return(
      <div className={cls}>
        <input {...paramsInput} />
        <div {...paramsThumb}></div>
        <div {...paramsThumbAnimation}></div>
        <div {...paramsDisplayValue}>
          {formatValue(value)}
        </div>
        <div className="discrete-slider__markers">
          {availableValues.map((v, i) => (
            <div
              key={i}
              className="discrete-slider__markers__marker"
              style={{ left: `${evalSliderMarkerPos((v - min) / range)}%` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}
