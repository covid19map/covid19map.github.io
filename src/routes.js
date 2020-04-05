import React from 'react';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import DataTable from './components/data-table/data-table';
import Survey from './components/survey/survey';
import Contact from './components/contact/contact';
import Imprint from './components/imprint/imprint';

// Set to 2000 when not in mantainace;
//const _minLoadingTime = 10000;
/*
const genLazyRoute = async (routeModule, timeMin = _minLoadingTime) => {
  return Promise.all([
    routeModule,
    new Promise(resolve => setTimeout(resolve, timeMin))
  ]).then(([moduleExports]) => moduleExports);
}

const DataTable = lazy(() => genLazyRoute(import('./components/data-table/data-table')));
const Survey = lazy(() => genLazyRoute(import('./components/survey/survey')));
const Contact = lazy(() => genLazyRoute(import('./components/contact/contact')));
const Imprint = lazy(() => genLazyRoute(import('./components/imprint/imprint')));
*/

const Routes = {
  Home: props => <Home {...props} />,
  Dashboard: props => <Dashboard {...props} />,
  DataTable: props => <DataTable {...props} />,
  Survey: props => <Survey {...props} />,
  Contact: props => <Contact {...props} />,
  Imprint: props => <Imprint {...props} />,
}

export default Routes;
