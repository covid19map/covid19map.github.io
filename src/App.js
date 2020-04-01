import React, { Suspense, lazy, Component } from 'react';
import { Router } from '@reach/router';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { ThemeProvider } from '@material-ui/core/styles';
import { materialTheme } from './theme/theme';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Navigation from './components/navigation/navigation';
import Loader from './components/loader/loader';

import { laboratoryDataMockup, surveyDataMockup } from './data-mockup';

const __PROXY = 'https://cors-anywhere.herokuapp.com/';

// TODO: refactor the two following function using a HOF
const getLaboratoryData = async () => {
  // TODO: is there a better solution for the proxy / CORS situation?
  const res = await fetch(
    `${__PROXY}http://nodejs-express-app-yadii.eu-gb.mybluemix.net/getOfficialData`
  );
  let data;
  try {
    data = await res.json();
    console.log('Received laboratory from server');
  } catch(e) {
    data = laboratoryDataMockup;
    console.error(e);
  }
  return data;
}

const getSurveyData = async () => {
  const res = await fetch(
    `${__PROXY}http://nodejs-express-app-yadii.eu-gb.mybluemix.net/getSurveyData`
  );
  let data;
  try {
    data = await res.json();
    console.log('Received survey from server');
  } catch(e) {
    data = surveyDataMockup;
    console.error(e);
  }
  return data;
}

// Set to 2000 when not in mantainace;
const _minLoadingTime = 0;
const genLazyRoute = async (routeModule, timeMin = _minLoadingTime) => {
  return Promise.all([
    routeModule,
    new Promise(resolve => setTimeout(resolve, timeMin))
  ]).then(([moduleExports]) => moduleExports);
}

//const Home = lazy(() => genLazyRoute(import('./components/home/home')));
const DataTable = lazy(() => genLazyRoute(import('./components/data-table/data-table')));
const Survey = lazy(() => genLazyRoute(import('./components/survey/survey')));
const Contact = lazy(() => genLazyRoute(import('./components/contact/contact')));
const Imprint = lazy(() => genLazyRoute(import('./components/imprint/imprint')));

const DataLoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker({
    delay: _minLoadingTime,
  });
  return promiseInProgress && <Loader />;
}

const AppWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        laboratory: {},
        survey: {},
      },
    }
  }

  async componentDidMount() {
    const laboratory = await trackPromise(getLaboratoryData());
    const survey = await trackPromise(getSurveyData());
    this.setState({
      data: { laboratory, survey }
    });
  }

  render() {
    const { data } = this.state,
          { laboratory, survey } = data,
          timestamps = Object.keys(laboratory),
          latestLaboratoryData = laboratory[timestamps[timestamps.length - 1]];
    
    return(
      <Suspense fallback={<Loader />}>
        <AppWrapper>
          <ThemeProvider theme={materialTheme}>
            <DataLoadingIndicator />
            <Navigation />
            <Router>
              {timestamps.length > 0 &&
                <Dashboard path="/" laboratory={laboratory} survey={survey} />
              }
              {!!latestLaboratoryData &&
                <DataTable path="/table" dataset={latestLaboratoryData} />
              }
              <Survey path="/survey" />
              <Contact path="/contact" />
              <Imprint path="/imprint" />
            </Router>
          </ThemeProvider>
        </AppWrapper>
      </Suspense>
    );
  }
}
