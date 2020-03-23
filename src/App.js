import React, { Suspense, lazy } from 'react';
import { Router } from "@reach/router";
import Navigation from './components/navigation/navigation';
import Loader from './components/loader/loader';

// TODO: set to 2000 when not in dev
const __MIN__LOADINGTIME = 2000;
const genLazyRoute = async (routeModule, timeMin = __MIN__LOADINGTIME) => {
  return Promise.all([
    routeModule,
    new Promise(resolve => setTimeout(resolve, timeMin))
  ]).then(([moduleExports]) => moduleExports);
}

const Dashboard = lazy(() => genLazyRoute(import('./Dashboard')));
const Survey = lazy(() => genLazyRoute(import('./components/survey/survery')));

const App = () => {
  return(
    <Suspense fallback={<Loader />}>
      <div className="app">
        <Navigation />
        <Router>
          <Dashboard path="/" />
          <Survey path="/survey" />
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
