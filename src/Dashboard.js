import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import DiscreteSlider from './components/discrete-slider/discrete-slider';
import DataMap from './components/data-map/data-map';
import DataPanel from './components/data-panel/data-panel';
import { filterPropValuePair } from './utilities/data-mutations';
import { dateDisplay } from './utilities/formatting';
import { interfaceOutGeoJSON } from './utilities/interfaces';
import './dashboard.css';

//import __DATA__MOCKUP from './data-mockup';

const __SATELLITE = 'satellite-v9';
const __LIGHTMODE = 'light-v10';
const __DARKMODE = 'dark-v10';
const __STREETS = 'streets-v11';

const permuteMapStyles = (currentValue) => {
  switch(currentValue) {
    case __SATELLITE:
      return __LIGHTMODE;
    case __LIGHTMODE:
      return __DARKMODE;
    case __DARKMODE:
      return __STREETS;
    case __STREETS:
      return __SATELLITE;
    default:
      console.log(`Sorry, the style '${currentValue}' doesn't exist.`);
  }
}

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      mapStyle: __DARKMODE,
      data: {
        fetched: {},
        filtered: {},
      },
      survey: {},
      currentTime: 0,
      filteredRegions: [],
      chartsExpanded: false,
      filtersExpanded: false,
    }
    this.registeredRegions = [];
  }

  handleReload = () => {
    document.location.reload();
  }

  handleSwitchTheme = () => {
    const { mapStyle } = this.state;
    this.setState({ mapStyle: permuteMapStyles(mapStyle) });
  }

  handleSetTime = (value) => {
    const { data: {filtered} } = this.state;
    const timestamps = Object.keys(filtered);
    this.setState({ currentTime: Number(value) + Number(timestamps[0]) });
  }

  // Not in use yet
  /*
  handleSetLive = () => {
    const { data: {filtered} } = this.state;
    const timestamps = Object.keys(filtered);
    // evaluate the closest timestamp to current time
    //const now = Date.now();
    //const D = timestamps.map(timestamp => Math.abs(timestamp - now));
    //const i = D.indexOf(Math.min(...D));
    // or just grab the last recorded timestamp...
    this.setState({
      currentTime: timestamps[timestamps.length - 1],
    });
  }
  */

  handleToggleCharts = () => {
    this.setState({
      chartsExpanded: !this.state.chartsExpanded,
    });
  }

  handleCollapseCharts = () => {
    this.setState({ chartsExpanded: false });
  }

  handleToggleFilters = () => {
    this.setState({
      filtersExpanded: !this.state.filtersExpanded,
    });
  }

  handleCollapseFilters = () => {
    this.setState({ filtersExpanded: false });
  }

  handleFilterCountries = (filteredRegions) => {
    this.setState({ filteredRegions });
    let { data } = this.state;
    const { fetched } = data;
    if(!!filteredRegions && filteredRegions.length > 0) {
      // filtered regions come as an object { value: ..., label: ... }
      filteredRegions = filteredRegions.map(r => r.value);
      data.filtered = filterPropValuePair(['province', 'country'], filteredRegions, fetched);
    } else {
      data.filtered = data.fetched;
    }
    this.setState({ data });
  }

  setTime = (unixtime) => {
    this.setState({
      currentTime: unixtime,
    });
  }

  componentDidMount() {
    const { data } = this.props;
    const timestamps = Object.keys(data);
    const currentTime = Number(timestamps[timestamps.length - 1]);
    this.setState({
      data: {
        fetched: data,
        filtered: data,
      },
      currentTime,
    });
    const __registeredRegions = [
      ...data[currentTime].map(datapoint => datapoint.province).filter(province => !!province),
      ...data[currentTime].map(datapoint => datapoint.country)
    ];
    // eliminate double entries and sort alphabetically
    this.registeredRegions = [...new Set(__registeredRegions)].sort().map(
      region => ({ value: region, label: region })
    );
  }

  render(){
    const {
      state,
      registeredRegions,
      handleFilterCountries,
      handleSetTime,
      handleToggleCharts,
      handleCollapseCharts,
      handleToggleFilters,
      handleCollapseFilters,
    } = this;
    const {
      mapStyle,
      data: {filtered},
      //survey,
      currentTime,
      filteredRegions,
      chartsExpanded,
      filtersExpanded,
    } = state;
  
    const timestamps = Object.keys(filtered);
    const timeBegin = Number(timestamps[0]);
    const timeEnd = Number(timestamps[timestamps.length - 1]);
    const geoData = interfaceOutGeoJSON(filtered[currentTime]);
    
    return(
      <Fragment>
        {filtered && <DataPanel
          data={filtered}
          currentTime={currentTime}
          chartsExpanded={chartsExpanded}
          onToggleFilters={handleToggleFilters}
          onToggleCharts={handleToggleCharts}
        />}
        {geoData && <DataMap
          data={geoData}
          mapStyle={mapStyle}
          onClick={handleCollapseCharts}
        />}
        <Modal
          open={filtersExpanded}
          onClose={handleCollapseFilters}
          classNames={{
            modal: 'modal-filters',
            overlay: 'modal-filters-overlay'
          }}
          center
        >
          <h2>Data filters</h2>
          <div className="filter-label">Country</div>
          <Select
            isMulti
            name="countries"
            options={registeredRegions}
            defaultValue={filteredRegions}
            onChange={handleFilterCountries}
          />
          <div className="filter-label">Time</div>
          <DiscreteSlider
            min={0}
            max={timeEnd - timeBegin}
            availableValues={timestamps.map(t => t - timeBegin)}
            startValue={currentTime - timeBegin}
            onChange={handleSetTime}
            formatValue={(v) => dateDisplay(new Date(v + Number(timeBegin)))}
          />
        </Modal>
        {!(currentTime === 0 || currentTime === timeEnd || filtersExpanded) &&
          <div className="dashboard-display-time">
            Current time: {dateDisplay(new Date(currentTime))}
          </div>
        }
      </Fragment>
    );
  }
}