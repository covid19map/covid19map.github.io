import React, { Fragment } from 'react';
import DataChart from './data-chart';
import { CircularLoader } from '../loader/loader';
import { condenseTimestampedData, filterOrderedProps } from '../../utilities/data-mutations';
import { bigIntegerDisplay, percentageDisplay } from '../../utilities/formatting';
import { ReactComponent as ArrowLeftIcon} from '../../icons/arrow-left.svg';
import { ReactComponent as FilterIcon} from '../../icons/filter.svg';
import { ReactComponent as GithubIcon} from '../../icons/github.svg';
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

export default DataPanel;
