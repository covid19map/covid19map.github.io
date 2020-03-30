import React, { Suspense, lazy, Component } from 'react';
import { Router } from "@reach/router";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
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
  } catch(e) {
    console.log(e);
    data = laboratoryDataMockup;
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
  } catch(e) {
    console.log(e);
    data = surveyDataMockup;
  }
  return data;
}

const __MIN__LOADINGTIME = 2000;
const genLazyRoute = async (routeModule, timeMin = __MIN__LOADINGTIME) => {
  return Promise.all([
    routeModule,
    new Promise(resolve => setTimeout(resolve, timeMin))
  ]).then(([moduleExports]) => moduleExports);
}

//const Home = lazy(() => genLazyRoute(import('./components/home/home')));
const DataTable = lazy(() => genLazyRoute(import('./components/data-table/data-table')));
const Survey = lazy(() => genLazyRoute(import('./components/survey/survery')));
//const Contact = lazy(() => genLazyRoute(import('./components/contact/contact')));
//const Imprint = lazy(() => genLazyRoute(import('./components/imprint/imprint')));

const DataLoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker({
    delay: __MIN__LOADINGTIME,
  });
  return promiseInProgress && <Loader />;
}

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
    console.log('Data recieved from server');
  }

  render() {
    const { data } = this.state,
          { laboratory, survey } = data,
          timestamps = Object.keys(laboratory),
          latestData = laboratory[timestamps[timestamps.length - 1]];
    
    return(
      <Suspense fallback={<Loader />}>
        <div className="app">
          <DataLoadingIndicator />
          <Navigation />
          <Router>
            {Object.keys(laboratory).length > 0 &&
              <Dashboard path="/" laboratory={laboratory} survey={survey} />
            }
            {latestData &&
              <DataTable path="/table" dataset={latestData} />
            }
            <Survey path="/survey" />
          </Router>
        </div>
      </Suspense>
    );
  }
}
