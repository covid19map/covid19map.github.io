import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import DataContext from '../../context/data-context';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import DataMap from '../data-map/data-map';
import DataPanel from '../data-panel/data-panel';
import { filterDataset, filterTimestampedData } from '../../utilities/data-mutations';
import { dateDisplay } from '../../utilities/formatting';
import {
  intfcGeoPointsCondensed,
  intfcGeoPointsSurvey,
  intfcGeoAreasCountries,
} from '../../utilities/interfaces';
import './dashboard.css';

//import __DATA__MOCKUP from './data-mockup';

//const __SATELLITE = 'satellite-v9';
//const __LIGHTMODE = 'light-v10';
const __DARKMODE = 'dark-v10';
//const __STREETS = 'streets-v11';

// Not in use yet
/*
const permuteMapStyles = (currentStyle) => {
  switch(currentStyle) {
    case __SATELLITE:
      return __LIGHTMODE;
    case __LIGHTMODE:
      return __DARKMODE;
    case __DARKMODE:
      return __STREETS;
    case __STREETS:
      return __SATELLITE;
    default:
      console.log(`Sorry, the style '${currentStyle}' doesn't exist.`);
      return __DARKMODE;
  }
}
*/

const registerRegions = (currentData) => {
  // Eliminate double entires from countries
  const _registeredCountries = [
    ...new Set(currentData.map(datapoint => datapoint.country).sort())
  ].map(
    region => ({ value: region, label: region })
  );
  // Eliminate empty entries from provinces
  const _registeredProvinces = currentData.map(
    datapoint => datapoint.province
  ).filter(
    province => !!province
  ).sort().map(
    region => ({ value: region, label: region })
  );
  // Summarize into class object
  return [
    {
      label: "Countries",
      options: _registeredCountries,
    },
    {
      label: "Provinces / States",
      options: _registeredProvinces,
    },
  ];
}

// TODO: Refactor as a reducer
const filterRegions = (regions, data, onUpdateRegions, onUpdateData) => {
  onUpdateRegions(regions);

  if(!!regions && regions.length > 0) {
    // filtered regions come as an object { value: ..., label: ... }
    regions = regions.map(r => r.value);
    data.laboratory.filtered = filterTimestampedData(
      ['province', 'country'],
      regions,
      data.laboratory.fetched,
    );
    data.survey.filtered = filterDataset(
      ['province', 'country'],
      regions,
      data.survey.fetched,
    );
  } else {
    data.laboratory.filtered = data.laboratory.fetched;
    data.survey.filtered = data.survey.fetched;
  }

  onUpdateData(data);
}

const TimeLabel = ({ children, open, value }) => {
  value = dateDisplay(new Date(value));
  return(
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function Dashboard() {
  //const [mapStyle, setMapStyle] = useState(__DARKMODE);
  const mapStyle = __DARKMODE;
  const [data, setData] = useState({});
  const [time, setTime] = useState(0);
  const [timestamps, setTimestamps] = useState([]);
  const [registeredRegions, setRegisteredRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [widgets, setWidgets] = useState({
    chartsExpanded: false,
    filtersExpanded: false,
  });
  const mapNode = useRef();
  const _data = useContext(DataContext);

  useEffect(() => {
    const _timestamps = Object.keys(_data.laboratory);
    if(_timestamps.length > 0) {
      const currentData = Object.values(_data.laboratory).slice(-1)[0];
      setRegisteredRegions(registerRegions(currentData));
      setTimestamps(_timestamps);
      setTime(_timestamps.slice(-1)[0]);
      setData({
        laboratory: {
          filtered: _data.laboratory,
          fetched: _data.laboratory,
        },
        survey: {
          filtered: _data.survey,
          fetched: _data.survey,
        }
      });
    }
  }, [_data]);

  const handleToggleCharts = () => {
    setWidgets({
      ...widgets,
      chartsExpanded: !widgets.chartsExpanded,
    });
  }

  const handleCollapseCharts = () => {
    setWidgets({
      ...widgets,
      chartsExpanded: false,
    });
  }

  const handleToggleFilters = () => {
    setWidgets({
      ...widgets,
      filtersExpanded: !widgets.filtersExpanded,
    });
  }

  const handleCollapseFilters = () => {
    setWidgets({
      ...widgets,
      filtersExpanded: false,
    });
  }

  return(
    <Fragment>
      {timestamps.length > 0 && <Fragment>
        <DataPanel
          data={data.laboratory.filtered}
          currentTime={time}
          chartsExpanded={widgets.chartsExpanded}
          onToggleFilters={handleToggleFilters}
          onToggleCharts={handleToggleCharts}
        />
        <div className="data-map-container" ref={mapNode}>
          <DataMap
            pointsSurvey={intfcGeoPointsSurvey(data.survey.filtered)}
            pointsCondensed={intfcGeoPointsCondensed(data.laboratory.filtered[time])}
            areasCountries={intfcGeoAreasCountries(data.laboratory.filtered[time])}
            container={mapNode}
            mapStyle={mapStyle}
            onClick={handleCollapseCharts}
            live={time === timestamps.slice(-1)[0]}
          />
        </div>
        <Modal
          open={widgets.filtersExpanded}
          onClose={handleCollapseFilters}
          classNames={{
            modal: 'modal-filters',
            overlay: 'modal-filters-overlay'
          }}
          center
        >
          <h2>Data filters</h2>
          <div className="filter-label">Region</div>
          <Select
            isMulti
            name="countries"
            options={registeredRegions}
            defaultValue={filteredRegions}
            onChange={(regions) => filterRegions(regions, data, setFilteredRegions, setData)}
          />
          <div className="filter-label">Time</div>
          <Slider
            min={Number(timestamps[0])}
            max={Number(timestamps.slice(-1)[0])}
            step={null}
            marks={timestamps.map(t => ({ value: t }))}
            valueLabelDisplay="off"
            ValueLabelComponent={TimeLabel}
            aria-label="select time"
            value={Number(time)}
            onChange={(e, value) => setTime(value)}
          />
        </Modal>
        {!(time === 0 || time === timestamps.slice(-1)[0] || widgets.filtersExpanded) &&
          <div className="dashboard-display-time">
            Current time: {dateDisplay(new Date(time))}
          </div>
        }
      </Fragment>}
    </Fragment>
  );
}

export default Dashboard;

/*
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      mapStyle: __DARKMODE,
      data: {
        laboratory: {
          fetched: {},
          filtered: {},
        },
        survey: {
          fetched: {},
          filtered: {},
        },
      },
      currentTime: 0,
      filteredRegions: [],
      chartsExpanded: false,
      filtersExpanded: false,
    }
    this.mapNode = null;
  }

  handleReload = () => {
    document.location.reload();
  }

  handleSwitchTheme = () => {
    const { mapStyle } = this.state;
    this.setState({ mapStyle: permuteMapStyles(mapStyle) });
  }

  setTime = (e, value) => {
    this.setState({
      currentTime: value,
    });
  };

  handleSetLive = () => {
    const { data } = this.state,
          { laboratory } = data;
    const timestamps = Object.keys(laboratory.filtered);
    // evaluate the closest timestamp to current time
    //const now = Date.now();
    //const D = timestamps.map(timestamp => Math.abs(timestamp - now));
    //const i = D.indexOf(Math.min(...D));
    // or just grab the last recorded timestamp...
    this.setState({
      currentTime: timestamps[timestamps.length - 1],
    });
  }

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

    const { data } = this.state,
          { laboratory, survey } = data;

    if(!!filteredRegions && filteredRegions.length > 0) {
      // filtered regions come as an object { value: ..., label: ... }
      filteredRegions = filteredRegions.map(r => r.value);
      data.laboratory.filtered = filterTimestampedData(
        ['province', 'country'],
        filteredRegions,
        laboratory.fetched,
      );
      data.survey.filtered = filterDataset(
        ['province', 'country'],
        filteredRegions,
        survey.fetched,
      );
    } else {
      data.laboratory.filtered = data.laboratory.fetched;
      data.survey.filtered = data.survey.fetched;
    }

    this.setState({ data });
  }

  componentDidMount() {
    // Load data into state
    // and set the current time to the latest possible date
    const { laboratory, survey } = this.props;
    const timestamps = Object.keys(laboratory);
    const currentTime = Number(timestamps[timestamps.length - 1]);

    this.setState({
      data: {
        laboratory: {
          fetched: laboratory,
          filtered: laboratory,
        },
        survey: {
          fetched: survey,
          filtered: survey,
        },
      },
      currentTime,
    });
    // Register all possible countries and regions
    // Eliminate double entries from countries
    const _registeredCountries = [
      ...new Set(laboratory[currentTime].map(datapoint => datapoint.country).sort())
    ].map(
      region => ({ value: region, label: region })
    );
    // Eliminate empty entries from provinces
    const _registeredProvinces = laboratory[currentTime].map(
      datapoint => datapoint.province
    ).filter(
      province => !!province
    ).sort().map(
      region => ({ value: region, label: region })
    );
    // Summarize into class object
    this.registeredRegions = [
      {
        label: "Countries",
        options: _registeredCountries,
      },
      {
        label: "Provinces / States",
        options: _registeredProvinces,
      },
    ];
  }

  render(){
    const {
      state,
      mapNode,
      registeredRegions,
      handleFilterCountries,
      setTime,
      handleToggleCharts,
      handleCollapseCharts,
      handleToggleFilters,
      handleCollapseFilters,
    } = this;
    const {
      mapStyle,
      data,
      currentTime,
      filteredRegions,
      chartsExpanded,
      filtersExpanded,
    } = state;
    const { laboratory, survey } = data;
  
    const timestamps = Object.keys(laboratory.filtered);
    const timeBegin = Number(timestamps[0]);
    const timeEnd = Number(timestamps[timestamps.length - 1]);
    
    return(
      <Fragment>
        {!!laboratory.filtered &&
          <DataPanel
            data={laboratory.filtered}
            currentTime={currentTime}
            chartsExpanded={chartsExpanded}
            onToggleFilters={handleToggleFilters}
            onToggleCharts={handleToggleCharts}
          />
        }
        <div className="data-map-container" ref={e => this.mapNode = e}>
          <DataMap
            pointsSurvey={intfcGeoPointsSurvey(survey.filtered)}
            pointsCondensed={intfcGeoPointsCondensed(laboratory.filtered[currentTime])}
            areasCountries={intfcGeoAreasCountries(laboratory.filtered[currentTime])}
            container={mapNode}
            mapStyle={mapStyle}
            onClick={handleCollapseCharts}
            live={currentTime === timeEnd}
          />
        </div>
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
          <div className="filter-label">Region</div>
          <Select
            isMulti
            name="countries"
            options={registeredRegions}
            defaultValue={filteredRegions}
            onChange={handleFilterCountries}
          />
          <div className="filter-label">Time</div>
          <Slider
            min={timeBegin}
            max={timeEnd}
            step={null}
            marks={timestamps.map(t => ({ value: t }))}
            valueLabelDisplay="off"
            ValueLabelComponent={TimeLabel}
            aria-label="select time"
            value={currentTime}
            onChange={setTime}
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
*/
