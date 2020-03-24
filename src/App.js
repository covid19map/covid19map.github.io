import React, { Suspense, lazy, Component } from 'react';
import { Router } from "@reach/router";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Dashboard from './Dashboard';
import Navigation from './components/navigation/navigation';
import Loader from './components/loader/loader';

const __PROXY = 'https://cors-anywhere.herokuapp.com/';
const getRecordedData = async () => {
  // TODO: is there a better solution for the proxy / CORS situation?
  const res = await fetch(
    `${__PROXY}http://nodejs-express-app-yadii.eu-gb.mybluemix.net/getOfficialData`
  );
  const data = await res.json();
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
      data: {},
    }
  }

  async componentDidMount() {
    const data = await trackPromise(getRecordedData());
    this.setState({ data });
    console.log('Data recieved from server');
  }

  render() {
    const { data } = this.state;
    const timestamps = Object.keys(data);
    const latestData = data[timestamps[timestamps.length - 1]];
    
    return(
      <Suspense fallback={<Loader />}>
        <div className="app">
          <DataLoadingIndicator />
          <Navigation />
          <Router>
            {Object.keys(data).length > 0 &&
              <Dashboard path="/" data={data} />
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
