import React, { Fragment } from 'react';
import DataChart from './data-chart';
import { CircularLoader } from '../loader/loader';
import { condenseData, filterOrderedProps } from '../../utilities/data-mutations';
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
  let condensedData, condensedDataCurrent, condensedDataConfined;
  if(isDataNotEmpty) {
    const confirmedValues = condenseData('confirmed', data),
          recoveredValues = condenseData('recovered', data),
          deathsValues = condenseData('deaths', data);
    condensedData = {
      confirmed: {...confirmedValues},
      recovered: {...recoveredValues},
      deaths: {...deathsValues},
    }
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
  const controlHandlers = { onToggleFilters, onToggleCharts }
  const clsCharts = `charts-container ${chartsExpanded ? 'expanded' : ''}`
  return(
    <Fragment>
      <div className="data-panel">
        {isDataNotEmpty ?
          <Fragment>
            <DataPanelTiles {...condensedDataCurrent} />
            <DataPanelControls {...controlHandlers} />
          </Fragment>
          : <div style={{ zIndex: 1000 }}><CircularLoader /></div>
        }
      </div>
      <div className={clsCharts}>
        <div className="charts-container__heading">
          <h2>Data chart</h2>
          <h3>(Cases over time)</h3>
        </div>
        {isDataNotEmpty && <DataChart data={condensedDataConfined} />}
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
          Recovery rate: {`${percentageDisplay(recovered / confirmed * 100)}%`}
        </div>
        <div>
          Mortality rate: {`${percentageDisplay(deaths / confirmed * 100)}%`}
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

const DataPanelControls = ({ onToggleFilters, onToggleCharts }) => {
  return(
    <div className="data-panel__controls">
      <span onClick={onToggleFilters}>
        <FilterIcon />
      </span>
      <span onClick={onToggleCharts}>
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

export default DataPanel;
