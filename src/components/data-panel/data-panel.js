import React, { Fragment } from 'react';
import DataChart from './data-chart';
import { CircularLoader } from '../loader/loader';
import { condenseTimestampedData, filterOrderedProps } from '../../utilities/data-mutations';
import { bigIntegerDisplay, percentageDisplay } from '../../utilities/formatting';
import './data-panel.css';

const DataPanel = (props) => {
  const {
    data,
    currentTime,
    chartsExpanded,
    onToggleFilters,
    onToggleCharts,
  } = props;

  const isDataNotEmpty = !!Object.keys(data).length;
  let condensedDataCurrent, condensedDataConfined;

  if(isDataNotEmpty) {
    const confirmedValues = condenseTimestampedData('confirmed', data),
          recoveredValues = condenseTimestampedData('recovered', data),
          deathsValues = condenseTimestampedData('deaths', data);

    condensedDataCurrent = {
      confirmed: confirmedValues[currentTime],
      recovered: recoveredValues[currentTime],
      deaths: deathsValues[currentTime],
    }

    condensedDataConfined = {
      confirmed: filterOrderedProps(currentTime, confirmedValues),
      recovered: filterOrderedProps(currentTime, recoveredValues),
      deaths: filterOrderedProps(currentTime, deathsValues),
    };
  }

  const controlHandlers = { onToggleFilters, onToggleCharts, chartsExpanded }
  const clsCharts = `charts-container ${chartsExpanded ? 'expanded' : ''}`

  return(
    <Fragment>
      <div className="data-panel">
        {isDataNotEmpty ?
          <Fragment>
            <DataPanelTiles {...condensedDataCurrent} />
            <DataPanelControls {...controlHandlers} />
          </Fragment>
          :
          <CircularLoader />
        }
      </div>
      <div className={clsCharts}>
        <div className="charts-container__heading">
          <h2>Data chart</h2>
          <h3>(Cases over time)</h3>
        </div>
        {isDataNotEmpty && <DataChart data={condensedDataConfined} />}
        <div className="charts-container__source">
          Data sources: Johns Hopkins University CSSE
          <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
            repository
          </a>
        </div>
      </div>
    </Fragment>
  );
}

const DataPanelTiles = ({ confirmed, deaths, recovered }) => {
  return(
    <Fragment>
      <DataPanelTile cls="confirmed" heading="Confirmed">
        {bigIntegerDisplay(confirmed)}
      </DataPanelTile>
      <DataPanelTile cls="recovered" heading="Recovered">
        {bigIntegerDisplay(recovered)}
      </DataPanelTile>
      <DataPanelTile cls="deaths" heading="Deaths">
        {bigIntegerDisplay(deaths)}
      </DataPanelTile>
      <DataPanelTile cls="computations" heading="Computations">
        <div>
          Active cases: {bigIntegerDisplay(confirmed - deaths - recovered)}
        </div>
        <div>
          Recovery rate: {`${percentageDisplay(confirmed ? recovered / confirmed * 100 : 0)}%`}
        </div>
        <div>
          Mortality rate: {`${percentageDisplay(confirmed ? deaths / confirmed * 100 : 0)}%`}
        </div>
      </DataPanelTile>
    </Fragment>
  );
}

const DataPanelTile = ({ cls, heading, children }) => {
  cls = `data-panel__tile ${cls}`;
  return(
    <div className={cls}>
      <div className="data-panel__tile__heading">{heading}</div>
      <div className="data-panel__tile__content">{children}</div>
    </div>
  );
}

const DataPanelControls = (props) => {
  const {
    onToggleFilters,
    onToggleCharts,
    chartsExpanded,
  } = props;
  const clsToggleCharts = `data-panel__controls__toggle-charts
    ${chartsExpanded ? 'expanded' : ''}`;
  return(
    <div className="data-panel__controls">
      <span onClick={onToggleFilters}>
        <FilterIcon />
      </span>
      <span className={clsToggleCharts} onClick={onToggleCharts}>
        <ArrowLeftIcon />
      </span>
    </div>
  );
}

/*
const LiveDataComputations = ({
  confirmed, deaths, recovered, children
}) => {
  return(
    <div className="data-panel-computations__block">
      <div className="data-panel-computations__metric">
        <span className="data-panel-computations__metric-key">
          Active cases:&nbsp;
        </span>
        <span className="data-panel-computations__metric-value">
          {bigIntegerDisplay(confirmed - deaths - recovered)}
        </span>
      </div>
      <div className="data-panel-computations__metric">
        <span className="live-data-panel-computations__metric-key">
          Recover rate:&nbsp;
        </span>
        <span className="data-panel-computations__metric-value">
          {`${percentageDisplay(recovered / confirmed * 100)}%`}
        </span>
      </div>
      <div className="data-panel-computations__metric">
        <span className="data-panel-computations__metric-key">
          Mortality rate:&nbsp;
        </span>
        <span className="data-panel-computations__metric-value">
          <span className="data-panel-computations__fatal">
            {`${percentageDisplay(deaths / confirmed * 100)}%`}
          </span>
        </span>
      </div>
      <div className="data-panel-computations__block-description">
        {children}
      </div>
    </div>
  );
}
*/

const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M24 11.871l-5-4.871v3h-19v4h19v3z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default DataPanel;
