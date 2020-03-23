import React, { Component, Fragment } from 'react';
import './controls.css';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientX: 0,
      clientY: 0,
      tooltipLabel: '',
    }
  }

  onMouseMove = (e) => {
    const { target, clientX, clientY } = e;
    const tooltipLabel = target.dataset.label;
    this.setState({ tooltipLabel, clientX, clientY });
  }

  render() {
    const { props, state, onMouseMove } = this;
    const {
      handleReload,
      handleSwitchTheme,
      handleExpandTable,
      handleSetLive,
      handleExpandTimeline,
    } = props;
    const { tooltipLabel, clientX, clientY } = state;
    const styTooltip = {
      top: clientY + 8,
      left: clientX + 12,
      padding: tooltipLabel ? '6px' : '0',
    }
    return(
      <Fragment>
        <ControlsTooltip sty={styTooltip} content={tooltipLabel} />
        <ControlsContainer onMouseMove={onMouseMove}>
          <ControlsIcon />
          <ControlsButton label="Reload" onClick={handleReload} icon={<ReloadIcon />} />
          <ControlsButton label="Switch Theme" onClick={handleSwitchTheme} icon={<LayersIcon />} />
          <ControlsButton label="Data table" onClick={handleExpandTable} icon={<TableIcon />} />
          <ControlsButton label="Back to Live Data" onClick={handleSetLive} icon={<EyeIcon />} />
          <ControlsButton label="Archived Data" onClick={handleExpandTimeline} icon={<TimelineIcon />} />
        </ControlsContainer>
      </Fragment>
    )
  }
}

const ControlsContainer = ({ onMouseMove, children }) => (
  <div className="controls" onMouseMove={onMouseMove}>
    {children}
  </div>
);

const ControlsTooltip = ({ sty, content }) => (
  <div className="controls-tooltip" style={sty}>{content}</div>
);

const ControlsIcon = () => (
  <div className="controls__icon">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
    </svg>
  </div>
);

const ControlsButton = ({ label, onClick, icon }) => (
  <div className="controls__button" data-label={label} onClick={onClick}>
    {icon}
  </div>
);

const ReloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" />
  </svg>
);

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z" />
  </svg>
);

const TableIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd">
    <path d="M5.829 6c-.412 1.165-1.524 2-2.829 2-1.656 0-3-1.344-3-3s1.344-3 3-3c1.305 0 2.417.835 2.829 2h13.671c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5h-4.671c-.412 1.165-1.524 2-2.829 2-1.305 0-2.417-.835-2.829-2h-4.671c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h13.671c.412-1.165 1.524-2 2.829-2 1.656 0 3 1.344 3 3s-1.344 3-3 3c-1.305 0-2.417-.835-2.829-2h-13.671c-2.484 0-4.5-2.016-4.5-4.5s2.016-4.5 4.5-4.5h4.671c.412-1.165 1.524-2 2.829-2 1.305 0 2.417.835 2.829 2h4.671c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5h-13.671zm6.171 5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
  </svg>
);
